import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import WalletConnect from '@walletconnect/client';
import { parseWalletConnectUri } from '@walletconnect/utils';
import { InteractionManager, Linking } from 'react-native';
import Minimizer from 'react-native-minimizer';

import { ERRORS, PLUG_DESCRIPTION } from '@/constants/walletconnect';
import { State, WalletConnectSession } from '@/interfaces/redux';
import { ClientMeta } from '@/interfaces/walletConnect';
import { DEFAULT_WALLET_CONNECT_STATE as DEFAULT_STATE } from '@/redux/utils';
import {
  getAllValidWalletConnectSessions,
  removeWalletConnectSessions,
  saveWalletConnectSession,
} from '@/services/WalletConnect';
import { delay } from '@/utils/utilities';
import {
  callRequestHandlerFactory,
  needSign,
  sessionRequestHandler,
} from '@/utils/walletConnect';

import { closeAllModals } from './alert';

const getNativeOptions = async () => ({
  clientMeta: PLUG_DESCRIPTION,
});

export const walletConnectSetPendingRedirect = createAsyncThunk<
  void,
  { requestId: number; redirect: { pending: boolean } },
  { state: State }
>(
  'walletconnect/setPendingRedirect',
  ({ requestId, redirect }, { dispatch, getState }) => {
    const { pendingRedirect } = getState().walletconnect;
    const updatedPendingRedirect = {
      ...pendingRedirect,
      [requestId]: redirect,
    };
    dispatch(updatePendingRedirect(updatedPendingRedirect));
  }
);

export const walletConnectRemovePendingRedirect = createAsyncThunk<
  void,
  { requestId: number },
  { state: State }
>(
  'walletconnect/removePendingRedirect',
  ({ requestId }, { dispatch, getState }) => {
    const { pendingRedirect } = getState().walletconnect;
    const { [requestId]: redirect, ...updatedPendingRedirect } =
      pendingRedirect;
    if (redirect) {
      if (redirect.scheme) {
        Linking.openURL(`${redirect.scheme}://`);
      } else {
        setTimeout(() => {
          Minimizer.goBack();
        }, 300);
      }
    }

    dispatch(updatePendingRedirect(updatedPendingRedirect));
  }
);

export const walletConnectOnSessionRequest = createAsyncThunk<
  string | void,
  {
    uri: string;
    requestId: number;
  },
  { state: State }
>(
  'walletconnect/onSessionRequest',
  async ({ uri, requestId }, { dispatch, getState }) => {
    try {
      const { clientMeta } = await getNativeOptions();
      const isPrelocked = () => getState().keyring.isPrelocked;
      const isUnlocked = () => getState().keyring.isUnlocked;
      const isInitialized = () => getState().keyring.isInitialized;
      try {
        const waitingFn = InteractionManager.runAfterInteractions;

        waitingFn(async () => {
          const allSessions = await getAllValidWalletConnectSessions();
          const wcUri = parseWalletConnectUri(uri);
          const alreadyConnected = Object.values(allSessions).some(session => {
            return (
              session.handshakeTopic === wcUri.handshakeTopic &&
              session.key === wcUri.key
            );
          });

          if (alreadyConnected) {
            return;
          }

          const walletConnector = new WalletConnect({
            clientMeta,
            uri,
          });

          walletConnector?.on('session_request', async (error, payload) => {
            const { peerId } = payload.params[0];
            const {
              bridgeTimeouts: { [requestId]: timeoutObj },
            } = getState().walletconnect;
            if (timeoutObj?.pending) {
              clearTimeout(timeoutObj.timeout);
              dispatch(removeBridgeTimeout({ requestId }));
            }
            dispatch(closeAllModals());
            await dispatch(
              setSession({
                sessionInfo: {
                  walletConnector,
                  pending: true,
                },
                peerId,
              })
            );

            let unlockTimeout;

            if (!isUnlocked() || !isInitialized()) {
              unlockTimeout = setTimeout(async () => {
                await dispatch(
                  walletConnectRejectSession({
                    peerId,
                    error: ERRORS.TIMEOUT,
                  })
                );
              }, 20000);
            }

            while (isPrelocked() || !isUnlocked() || !isInitialized()) {
              await delay(300);
            }

            if (unlockTimeout) {
              clearTimeout(unlockTimeout);
            }

            sessionRequestHandler({ error, payload, requestId });
          });
        });
      } catch (error) {
        console.log('Wallet Connect Connect Error:', error);
      }
    } catch (error) {
      console.log('Wallet Connect Missing FCM Error:', error);
    }
  }
);

const listenOnNewMessages = createAsyncThunk<
  void | any,
  WalletConnect,
  { state: State }
>(
  'walletconnect/listenOnNewMessages',
  (walletConnector, { dispatch, getState }) => {
    const getHandlerAndExecutor = callRequestHandlerFactory(dispatch, getState);
    const isPrelocked = () => getState().keyring.isPrelocked;
    const isUnlocked = () => getState().keyring.isUnlocked;
    const isInitialized = () => getState().keyring.isInitialized;
    const { peerId } = walletConnector;

    walletConnector.on('call_request', async (error, payload) => {
      if (error) {
        throw error;
      }
      const { clientId, peerMeta } = walletConnector;
      const requestId: number = payload.id;
      const {
        bridgeTimeouts: { [requestId]: timeoutObj },
      } = getState().walletconnect;
      if (timeoutObj?.pending) {
        clearTimeout(timeoutObj.timeout);
        dispatch(removeBridgeTimeout({ requestId }));
      }
      try {
        dispatch(closeAllModals());
        const { pendingCallRequests } = getState().walletconnect;
        if (!pendingCallRequests[requestId]) {
          const [handler, executor] = getHandlerAndExecutor(payload.method);

          const request = await dispatch(
            addCallRequestToApprove({
              clientId,
              peerId,
              requestId,
              payload,
              peerMeta,
              executor,
            })
          ).unwrap();

          if (!handler || !executor) {
            return dispatch(
              walletConnectExecuteAndResponse({
                requestId,
                error: ERRORS.NOT_METHOD,
              })
            );
          }

          // If the method is isUnlock we have NOT to check if it is locked and just run the executor
          if (payload.method === 'isUnlock') {
            return dispatch(
              walletConnectExecuteAndResponse({ requestId, args: [] })
            );
          }

          let unlockTimeOut: NodeJS.Timeout | null = null;
          if (!isUnlocked()) {
            // TODO: Check with the team if we want to response with an error or just wait for the user to unlock
            unlockTimeOut = setTimeout(() => {
              return dispatch(
                walletConnectExecuteAndResponse({
                  requestId,
                  error: ERRORS.TIMEOUT,
                })
              );
            }, 20000);
          }

          if (needSign(payload.method, request.args)) {
            const waitingFn = InteractionManager.runAfterInteractions;

            waitingFn(async () => {
              while (isPrelocked() || !isUnlocked() || !isInitialized()) {
                await delay(300);
              }
              if (unlockTimeOut) {
                clearTimeout(unlockTimeOut);
              }
              await handler(requestId, ...request.args);
            });
          } else {
            if (unlockTimeOut) {
              clearTimeout(unlockTimeOut);
            }
            await handler(requestId, ...request.args);
          }
        }
      } catch (e: any) {
        console.log('Wallet Connect Call Request Error:', e);
        dispatch(
          walletConnectExecuteAndResponse({
            requestId,
            error: ERRORS.SERVER_ERROR(e.message),
          })
        );
      }
    });

    walletConnector.on('disconnect', (_, payloads) => {
      const [args] = payloads.params;
      const executor = getHandlerAndExecutor('disconnect')[1];

      executor(args);

      dispatch(clearSession({ peerId }));

      removeWalletConnectSessions(walletConnector.peerId);
    });
    return walletConnector;
  }
);

// eslint-disable-next-line no-spaced-func
export const walletConnectExecuteAndResponse = createAsyncThunk<
  void,
  {
    requestId: number;
    error?: any;
    args?: never[];
    opts?: any;
    onSuccess?: () => void;
  },
  { state: State }
>(
  'walletconnect/executeAndResponse',
  async (params, { dispatch, getState }) => {
    const { requestId, args, opts, error, onSuccess } = params;
    try {
      const request = getState().walletconnect.pendingCallRequests[requestId];
      const { walletConnector } =
        getState().walletconnect.sessions[request.peerId];
      const { executor } = request;
      if (walletConnector) {
        try {
          if (error || !executor) {
            walletConnector.rejectRequest({
              error: error || ERRORS.NOT_APPROVED,
              id: requestId,
            });
          } else {
            const { result, error: resultError } = await executor(
              opts,
              ...args!
            );
            if (result !== undefined) {
              walletConnector.approveRequest({ id: requestId, result });
              onSuccess?.();
            } else {
              walletConnector.rejectRequest({
                error: resultError,
                id: requestId,
              });
            }
          }
          await dispatch(removeCallRequestToApprove({ requestId }));
          await dispatch(walletConnectRemovePendingRedirect({ requestId }));
        } catch (e) {
          console.log('Failed to send request status to WalletConnect.', e);
        }
      } else {
        console.log(
          'WalletConnect session has expired while trying to send request status. Please reconnect.'
        );
      }
    } catch (e) {
      console.log('EXECUTE AND RESPONSE ERROR', e);
    }
  }
);

export const addCallRequestToApprove = createAsyncThunk<
  any,
  {
    clientId: string;
    peerId: string;
    requestId: number;
    payload: any;
    peerMeta: ClientMeta | null;
    executor: any;
  },
  { state: State }
>(
  'walletconnect/addCallRequestToApprove',
  async (
    { clientId, peerId, requestId, payload, peerMeta, executor },
    { dispatch, getState }
  ) => {
    const { pendingCallRequests } = getState().walletconnect;

    const imageUrl = peerMeta?.url;
    const dappName = peerMeta?.name || 'Unknown Dapp';
    const dappUrl = peerMeta?.url || 'Unknown Url';
    const dappScheme = null;
    const request = {
      clientId,
      dappName,
      dappScheme,
      dappUrl,
      imageUrl,
      methodName: payload.method,
      args: payload.params,
      peerId,
      requestId,
      executor,
    };

    const updatedRequests = { ...pendingCallRequests, [requestId]: request };
    dispatch(updateCallRequests(updatedRequests));

    return request;
  }
);

export const removeCallRequestToApprove = createAsyncThunk<
  void,
  { requestId: number },
  { state: State }
>(
  'walletconnect/removeCallRequestToApprove',
  ({ requestId }, { dispatch, getState }) => {
    const { pendingCallRequests } = getState().walletconnect;

    const updatedPendingRequests = pendingCallRequests;
    if (updatedPendingRequests[requestId]) {
      delete updatedPendingRequests[requestId];
    }
    dispatch(updateCallRequests(updatedPendingRequests));
  }
);

export const setSession = createAsyncThunk<
  void,
  { peerId: string; sessionInfo: any },
  { state: State }
>(
  'walletconnect/setSession',
  ({ peerId, sessionInfo }, { dispatch, getState }) => {
    const { sessions } = getState().walletconnect;
    const updatedSessions = {
      ...sessions,
      [peerId]: { ...(sessions[peerId] || {}), ...sessionInfo },
    };
    dispatch(updateSessions(updatedSessions));
  }
);

export const getSession = createAsyncThunk<
  WalletConnectSession,
  { peerId: string },
  { state: State }
>('walletconnect/getSession', ({ peerId }, { getState }) => {
  const { sessions } = getState().walletconnect;
  return sessions[peerId];
});

export const clearSession = createAsyncThunk<
  void,
  { peerId: string },
  { state: State }
>('walletconnect/clearSession', ({ peerId }, { dispatch, getState }) => {
  const { [peerId]: removedSession, ...sessions } =
    getState().walletconnect.sessions;
  const updatedSessions = { ...sessions };

  const { walletConnector } = removedSession;

  walletConnector.off('session_request');
  walletConnector.off('call_request');
  walletConnector.off('disconnect');

  dispatch(updateSessions(updatedSessions));
});

export const walletConnectApproveSession = createAsyncThunk<
  void,
  { peerId: string; chainId: number; accountAddress: string },
  { state: State }
>(
  'walletconnect/approveSession',
  async ({ peerId, chainId, accountAddress }, { dispatch, getState }) => {
    // TODO: We're going to use accountAddres later.
    const { sessions } = getState().walletconnect;
    const { walletConnector } = sessions[peerId];

    walletConnector.approveSession({
      accounts: [accountAddress],
      chainId,
    });

    saveWalletConnectSession(walletConnector.peerId, walletConnector.session);

    await dispatch(listenOnNewMessages(walletConnector));
  }
);

export const walletConnectRejectSession = createAsyncThunk<
  void,
  { peerId: string; error?: any },
  { state: State }
>(
  'walletconnect/rejectSession',
  ({ peerId, error }, { getState, dispatch }) => {
    const { sessions } = getState().walletconnect;
    const { walletConnector } = sessions[peerId];

    walletConnector.rejectSession(error || ERRORS.SESSION_REJECTED);

    dispatch(clearSession({ peerId }));
  }
);

export const addBridgeTimeout = createAsyncThunk<
  void,
  { requestId: number; timeout: number },
  { state: State }
>(
  'walletconnect/addBridgeTimeout',
  ({ requestId, timeout }, { dispatch, getState }) => {
    const { bridgeTimeouts } = getState().walletconnect;

    if (bridgeTimeouts[requestId]?.pending) {
      clearTimeout(bridgeTimeouts[requestId]?.timeout);
    }

    const updatedTimeouts = {
      ...bridgeTimeouts,
      [requestId]: { timeout, pending: true },
    };

    dispatch(updateBridgeTimeout(updatedTimeouts));
  }
);

export const removeBridgeTimeout = createAsyncThunk<
  void,
  { requestId: number },
  { state: State }
>(
  'walletconnect/removeBridgeTimeout',
  ({ requestId }, { dispatch, getState }) => {
    const { bridgeTimeouts } = getState().walletconnect;
    delete bridgeTimeouts[requestId];
    dispatch(updateBridgeTimeout(bridgeTimeouts));
  }
);

export const walletconnectSlice = createSlice({
  name: 'walletconnect',
  initialState: DEFAULT_STATE,
  reducers: {
    updateCallRequests: (state, action) => {
      return {
        ...state,
        pendingCallRequests: action.payload,
      };
    },
    updateSessions: (state, action) => {
      return {
        ...state,
        sessions: action.payload,
      };
    },
    clearState: state => {
      return {
        ...state,
        ...DEFAULT_STATE,
      };
    },
    updatePendingRedirect: (state, action) => {
      return {
        ...state,
        pendingRedirect: action.payload,
      };
    },
    updateBridgeTimeout: (state, action) => {
      return {
        ...state,
        bridgeTimeouts: action.payload,
      };
    },
  },
  extraReducers: {},
});

export const {
  updateCallRequests,
  updateSessions,
  clearState,
  updatePendingRedirect,
  updateBridgeTimeout,
} = walletconnectSlice.actions;

export default walletconnectSlice.reducer;
