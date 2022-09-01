import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import WalletConnect from '@walletconnect/client';
import { parseWalletConnectUri } from '@walletconnect/utils';
import { InteractionManager, Linking } from 'react-native';
import Minimizer from 'react-native-minimizer';

import { ERRORS, PLUG_DESCRIPTION } from '@/constants/walletconnect';
import Routes from '@/navigation/Routes';
import { DEFAULT_WALLET_CONNECT_STATE as DEFAULT_STATE } from '@/redux/utils';
import {
  getAllValidWalletConnectSessions,
  saveWalletConnectSession,
} from '@/services/WalletConnect';
import Navigation from '@/utils/navigation';
import { delay } from '@/utils/utilities';
import {
  callRequestHandlerFactory,
  needSign,
  sessionRequestHandler,
} from '@/utils/walletConnect';

const getNativeOptions = async () => ({
  clientMeta: PLUG_DESCRIPTION,
});

export const walletConnectSetPendingRedirect = createAsyncThunk(
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

export const walletConnectRemovePendingRedirect = createAsyncThunk(
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

export const walletConnectOnSessionRequest = createAsyncThunk(
  'walletconnect/onSessionRequest',
  async ({ uri }, { dispatch, getState }) => {
    try {
      const { clientMeta } = await getNativeOptions();
      const isPrelocked = () => getState().keyring.isPrelocked;
      const isUnlocked = () => getState().keyring.isUnlocked;
      const isInitialized = () => getState().keyring.isInitialized;
      try {
        // Don't initiate a new session if we have already established one using this walletconnect URI
        let unlockTimeOut;
        if (!isUnlocked()) {
          unlockTimeOut = setTimeout(() => {
            throw new Error('Wallet Unlock Timeout');
          }, 20000);

          Navigation.handleAction(Routes.LOGIN_SCREEN);
        }

        const waitingFn = InteractionManager.runAfterInteractions;

        waitingFn(async () => {
          while (isPrelocked() || !isUnlocked() || !isInitialized()) {
            await delay(300);
          }
          if (unlockTimeOut) {
            clearTimeout(unlockTimeOut);
          }

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
              bridgeTimeout: { timeout },
            } = getState().walletconnect;
            if (timeout) {
              clearTimeout(timeout);
              dispatch(updateBridgeTimeout(DEFAULT_STATE.bridgeTimeout));
            }
            await dispatch(
              setSession({
                sessionInfo: {
                  walletConnector,
                  pending: true,
                },
                peerId,
              })
            );

            sessionRequestHandler({ error, payload });
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

const listenOnNewMessages = createAsyncThunk(
  'walletconnect/listenOnNewMessages',
  (walletConnector, { dispatch, getState }) => {
    const getHandlerAndExecutor = callRequestHandlerFactory(dispatch, getState);
    const isPrelocked = () => getState().keyring.isPrelocked;
    const isUnlocked = () => getState().keyring.isUnlocked;
    const isInitialized = () => getState().keyring.isInitialized;
    walletConnector.on('call_request', async (error, payload) => {
      const {
        bridgeTimeout: { timeout },
      } = getState().walletconnect;
      if (timeout) {
        clearTimeout(timeout);
        dispatch(updateBridgeTimeout(DEFAULT_STATE.bridgeTimeout));
      }
      if (error) {
        throw error;
      }
      const { clientId, peerId, peerMeta } = walletConnector;
      const requestId = payload.id;
      try {
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
                peerId,
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

          let unlockTimeOut;
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
      } catch (e) {
        console.log('Wallet Connect Call Request Error:', e);
        dispatch(
          walletConnectExecuteAndResponse({
            requestId,
            peerId,
            error: ERRORS.SERVER_ERROR(e),
          })
        );
      }
    });
    walletConnector.on('disconnect', error => {
      if (error) {
        throw error;
      }
    });
    return walletConnector;
  }
);

export const walletConnectExecuteAndResponse = createAsyncThunk(
  'walletconnect/executeAndResponse',
  /**  @param params { any } */
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
            await walletConnector.rejectRequest({
              error: error || ERRORS.NOT_APPROVED,
              id: requestId,
            });
          } else {
            const { result, error: resultError } = await executor(
              opts,
              ...args
            );
            if (result !== undefined) {
              await walletConnector.approveRequest({ id: requestId, result });
              onSuccess?.();
            } else {
              await walletConnector.rejectRequest({
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

export const addCallRequestToApprove = createAsyncThunk(
  'walletconnect/addCallRequestToApprove',
  async (
    { clientId, peerId, requestId, payload, peerMeta, executor },
    { dispatch, getState }
  ) => {
    const { pendingCallRequests } = getState().walletconnect;

    const imageUrl = peerMeta?.url;
    const dappName = peerMeta?.name || 'Unknown Dapp';
    const dappUrl = peerMeta?.url || 'Unknown Url';
    const dappScheme = peerMeta?.scheme || null;
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

export const removeCallRequestToApprove = createAsyncThunk(
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

export const setSession = createAsyncThunk(
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

export const getSession = createAsyncThunk(
  'walletconnect/getSession',
  ({ peerId }, { getState }) => {
    const { sessions } = getState().walletconnect;
    return sessions[peerId];
  }
);

export const clearSession = createAsyncThunk(
  'walletconnect/clearSession',
  ({ peerId }, { dispatch, getState }) => {
    const { sessions } = getState().walletconnect;
    const updatedSessions = { ...sessions, [peerId]: {} };
    dispatch(updateSessions(updatedSessions));
  }
);

export const walletConnectApproveSession = createAsyncThunk(
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

export const walletConnectRejectSession = createAsyncThunk(
  'walletconnect/rejectSession',
  ({ peerId }, { getState }) => {
    const { sessions } = getState().walletconnect;
    const { walletConnector } = sessions[peerId];

    walletConnector.rejectSesison();
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
        bridgeTimeout: action.payload,
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
