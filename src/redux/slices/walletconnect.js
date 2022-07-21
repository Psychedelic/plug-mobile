import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import WalletConnect from '@walletconnect/client';
import { parseWalletConnectUri } from '@walletconnect/utils';
import { InteractionManager, Linking } from 'react-native';
import Minimizer from 'react-native-minimizer';

import {
  ERRORS,
  PLUG_DESCRIPTION,
  SIGNING_METHODS,
} from '@/constants/walletconnect';
import Routes from '@/navigation/Routes';
import { walletConnectStorage } from '@/redux/store';
import { DEFAULT_WALLET_CONNECT_STATE as DEFAULT_STATE } from '@/redux/utils';
import {
  getAllValidWalletConnectSessions,
  saveWalletConnectSession,
} from '@/services/WalletConnect';
import Navigation from '@/utils/navigation';
import { delay } from '@/utils/utilities';
import {
  callRequestHandlerFactory,
  connectionRequestResponseHandlerFactory,
  sessionRequestHandler,
} from '@/utils/walletConnect';

const getNativeOptions = async () => ({
  clientMeta: PLUG_DESCRIPTION,
});

export const walletConnectSetPendingRedirect = createAsyncThunk(
  'walletconnect/setPendingRedirect',
  (_, { dispatch }) => {
    dispatch(setPendingRedirect());
  }
);

export const walletConnectRemovePendingRedirect = createAsyncThunk(
  'walletconnect/removePendingRedirect',
  ({ scheme }, { dispatch }) => {
    dispatch(removePendingRedirect());
    if (scheme) {
      Linking.openURL(`${scheme}://`);
    } else {
      setTimeout(() => {
        Minimizer.goBack();
      }, 300);
    }
  }
);

export const walletConnectOnSessionRequest = createAsyncThunk(
  'walletconnect/onSessionRequest',
  async ({ uri }, { dispatch, getState }) => {
    const receivedTimestamp = Date.now();
    try {
      await walletConnectStorage.clear();
      const { clientMeta } = await getNativeOptions();
      try {
        // Don't initiate a new session if we have already established one using this walletconnect URI
        let unlockTimeOut;
        if (!getState().keyring.isUnlocked) {
          unlockTimeOut = setTimeout(() => {
            throw new Error('Wallet Unlock Timeout');
          }, 20000);

          Navigation.handleAction(Routes.LOGIN_SCREEN);
        }

        const waitingFn = InteractionManager.runAfterInteractions;

        waitingFn(async () => {
          while (
            !getState().keyring.isUnlocked ||
            !getState().keyring.isInitialized
          ) {
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
          const routeParams = {
            callback: connectionRequestResponseHandlerFactory(dispatch, uri),
            receivedTimestamp,
          };

          await dispatch(
            setSession({
              sessionInfo: {
                walletConnector,
                meta: null,
                navigate: false,
                timedOut: false,
                timeout: null,
                routeParams,
              },
              uri,
            })
          );

          walletConnector?.on('session_request', (error, payload) => {
            const {
              bridgeTimeout: { timeout },
            } = getState().walletconnect;
            if (timeout) {
              clearTimeout(timeout);
              dispatch(updateBridgeTimeout(DEFAULT_STATE.bridgeTimeout));
            }
            sessionRequestHandler(
              { dispatch, getState, uri },
              { error, payload }
            );
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
    const getWalletConnectHandlers = callRequestHandlerFactory(
      dispatch,
      getState
    );
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
          const [handler, executor] = getWalletConnectHandlers(payload.method);

          if (!handler) {
            return dispatch(
              walletConnectExecuteAndResponse({
                peerId,
                requestId,
                error: ERRORS.NOT_METHOD,
              })
            );
          }

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

          // If the method is isUnlock we have NOT to check if it is locked and just run the executor
          if (payload.method === 'isUnlock') {
            return dispatch(
              walletConnectExecuteAndResponse({ peerId, requestId, args: [] })
            );
          }

          let unlockTimeOut;
          if (!getState().keyring.isUnlocked) {
            unlockTimeOut = setTimeout(() => {
              return dispatch(
                walletConnectExecuteAndResponse({
                  peerId,
                  requestId,
                  error: ERRORS.TIMEOUT,
                })
              );
            }, 20000);
          }

          if (
            !getState().keyring.isUnlocked ||
            payload.method in SIGNING_METHODS
          ) {
            const waitingFn = InteractionManager.runAfterInteractions;

            waitingFn(async () => {
              while (
                !getState().keyring.isUnlocked ||
                !getState().keyring.isInitialized
              ) {
                await delay(300);
              }
              if (unlockTimeOut) {
                clearTimeout(unlockTimeOut);
              }
              await handler(request, ...request.args);
            });
          } else {
            await handler(request, ...request.args);
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
  async (
    { peerId, requestId, args, opts, error, onSuccess },
    { dispatch, getState }
  ) => {
    try {
      const walletConnector = getState().walletconnect.walletConnectors[peerId];
      const { pendingRedirect } = getState().walletconnect;
      const { executor } =
        getState().walletconnect.pendingCallRequests[requestId] || {};
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
          if (pendingRedirect) {
            await dispatch(walletConnectRemovePendingRedirect({}));
          }
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

export const setPendingSessionRequest = createAsyncThunk(
  'walletconnect/setPendingSessionRequest',
  ({ peerId, walletConnector }, { dispatch, getState }) => {
    const { pendingSessionRequests } = getState().walletconnect;
    const updatedPendingSessionRequests = {
      ...pendingSessionRequests,
      [peerId]: walletConnector,
    };
    dispatch(updateSessionRequest(updatedPendingSessionRequests));
  }
);

export const getPendingSessionRequest = createAsyncThunk(
  'walletconnect/getPendingsSessionRequest',
  ({ peerId }, { getState }) => {
    const { pendingSessionRequests } = getState().walletconnect;
    return pendingSessionRequests[peerId];
  }
);

export const removePendingRequest = createAsyncThunk(
  'walletconnect/removePendingRequest',
  ({ peerId }, { dispatch, getState }) => {
    const { pendingRequests } = getState().walletconnect;
    const updatedPendingRequests = pendingRequests;
    if (updatedPendingRequests[peerId]) {
      delete updatedPendingRequests[peerId];
    }
    dispatch(updateSessionRequest(updatedPendingRequests));
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
  ({ uri, sessionInfo }, { dispatch, getState }) => {
    const { sessions } = getState().walletconnect;
    const updatedSessions = {
      ...sessions,
      [uri]: { ...(sessions[uri] || {}), ...sessionInfo },
    };
    dispatch(updateSessions(updatedSessions));
  }
);

export const getSession = createAsyncThunk(
  'walletconnect/getSession',
  ({ uri }, { getState }) => {
    const { sessions } = getState().walletconnect;
    return sessions[uri];
  }
);

export const clearSession = createAsyncThunk(
  'walletconnect/clearSession',
  ({ uri }, { dispatch, getState }) => {
    const { sessions } = getState().walletconnect;
    const updatedSessions = { ...sessions, [uri]: {} };
    dispatch(updateSessions(updatedSessions));
  }
);

export const setWalletConnector = createAsyncThunk(
  'walletconnect/setWalletConnector',
  ({ walletConnector }, { dispatch, getState }) => {
    const { walletConnectors } = getState().walletconnect;
    const updatedWalletConnectors = {
      ...walletConnectors,
      [walletConnector.peerId]: walletConnector,
    };
    dispatch(updateConnectors(updatedWalletConnectors));
  }
);

export const getWalletConnector = createAsyncThunk(
  'walletconnect/getWalletConnector',
  ({ peerId }, { dispatch, getState }) => {
    const { walletConnectors } = getState().walletconnect;
    const walletConnector = walletConnectors[peerId];
    return walletConnector;
  }
);

export const removeWalletConnector = createAsyncThunk(
  'walletconnect/removeWalletConnector',
  ({ peerId }, { dispatch, getState }) => {
    const { walletConnectors } = getState().walletconnect;
    const updatedWalletConnectors = walletConnectors;
    if (updatedWalletConnectors[peerId]) {
      delete updatedWalletConnectors[peerId];
    }
    dispatch(updateConnectors(updatedWalletConnectors));
  }
);

export const walletConnectApproveSession = createAsyncThunk(
  'walletconnect/approveSession',
  async ({ peerId, chainId, accountAddress }, { dispatch, getState }) => {
    // TODO: We're going to use accountAddres later.
    const { pendingSessionRequests } = getState().walletconnect;
    const walletConnector = pendingSessionRequests[peerId];

    walletConnector.approveSession({
      accounts: [
        'MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEPdfv1T20KMFZRKBYZZDTDMSZ5MWw/+ReiwC9GF6LAUFTER1TZN4qdkXETOHDP0R6UkS6VD0jIjHyPov6pM4Qtw==',
      ],
      chainId,
    });

    dispatch(removePendingRequest({ peerId }));
    saveWalletConnectSession(walletConnector.peerId, walletConnector.session);

    const listeningWalletConnector = await dispatch(
      listenOnNewMessages(walletConnector)
    ).unwrap();

    dispatch(
      setWalletConnector({
        walletConnector: listeningWalletConnector,
      })
    );
  }
);

export const walletConnectRejectSession = createAsyncThunk(
  'walletconnect/rejectSession',
  ([peerId, walletConnector], { dispatch }) => {
    walletConnector.rejectSession();
    dispatch(removePendingRequest({ peerId }));
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
    updateSessionRequest: (state, action) => {
      return {
        ...state,
        pendingSessionRequests: action.payload,
      };
    },
    updateSessions: (state, action) => {
      return {
        ...state,
        sessions: action.payload,
      };
    },
    updateConnectors: (state, action) => {
      return {
        ...state,
        walletConnectors: action.payload,
      };
    },
    clearState: state => {
      return {
        ...state,
        ...DEFAULT_STATE,
      };
    },
    setPendingRedirect: state => {
      return {
        ...state,
        pendingRedirect: true,
      };
    },
    removePendingRedirect: state => {
      return {
        ...state,
        pendingRedirect: false,
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
  updateSessionRequest,
  updateConnectors,
  updateSessions,
  clearState,
  setPendingRedirect,
  removePendingRedirect,
  updateBridgeTimeout,
} = walletconnectSlice.actions;

export default walletconnectSlice.reducer;
