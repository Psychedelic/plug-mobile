import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { captureException } from '@sentry/react-native';
import WalletConnect from '@walletconnect/client';
import { parseWalletConnectUri } from '@walletconnect/utils';
import { Alert, AppState, InteractionManager, Linking } from 'react-native';
import Minimizer from 'react-native-minimizer';
import URL, { qs } from 'url-parse';

import {
  BIOMETRICS_ANIMATION_DELAY,
  DEFAULT_STATE,
  ERRORS,
  IS_TESTING,
  PLUG_DESCRIPTION,
} from '@/constants/walletconnect';
import Routes from '@/navigation/Routes';
import {
  getAllValidWalletConnectSessions,
  saveWalletConnectSession,
} from '@/services/WalletConnect';
import Navigation from '@/utils/navigation';
import { delay } from '@/utils/utilities';
import {
  callRequestHandlerFactory,
  connectionRequestResponseHandlerFactory,
  notSigningMethod,
  sessionRequestHandlerFactory,
} from '@/utils/walletConnect';

let showRedirectSheetThreshold = 300;

const getNativeOptions = async () => {
  const nativeOptions = {
    clientMeta: PLUG_DESCRIPTION,
  };

  return nativeOptions;
};

export const walletConnectSetPendingRedirect = createAsyncThunk(
  'walletconnect/setPendingRedirect',
  (params, { getState, dispatch }) => {
    dispatch(setPendingRedirect());
  },
);

export const walletConnectRemovePendingRedirect = createAsyncThunk(
  'walletconnect/removePendingRedirect',
  ({ type, scheme }, { dispatch }) => {
    dispatch(removePendingRedirect());
    const lastActiveTime = new Date().getTime();
    if (scheme) {
      Linking.openURL(`${scheme}://`);
    } else if (type !== 'timedOut') {
      if (type === 'sign' || type === 'transaction') {
        showRedirectSheetThreshold += BIOMETRICS_ANIMATION_DELAY;
        setTimeout(() => {
          Minimizer.goBack();
        }, BIOMETRICS_ANIMATION_DELAY);
      } else if (type === 'sign-canceled' || type === 'transaction-canceled') {
        setTimeout(() => {
          Minimizer.goBack();
        }, 300);
      } else {
        Minimizer.goBack();
      }
      // If it's still active after showRedirectSheetThreshold
      // We need to show the redirect sheet cause the redirect
      // didn't work
      setTimeout(() => {
        const now = new Date().getTime();
        const delta = now - lastActiveTime;
        if (AppState.currentState === 'active' && delta < 1000) {
          return Navigation.handleAction(Routes.WALLET_CONNECT_REDIRECT_SHEET, {
            type,
          });
        }
        return;
      }, showRedirectSheetThreshold);
    }
  },
);

export const walletConnectOnSessionRequest = createAsyncThunk(
  'walletconnect/onSessionRequest',
  async ({ uri, callback }, { dispatch, getState }) => {
    const receivedTimestamp = Date.now();
    try {
      const { clientMeta } = await getNativeOptions();
      try {
        // Don't initiate a new session if we have already established one using this walletconnect URI
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
          callback: connectionRequestResponseHandlerFactory(
            dispatch,
            callback,
            uri,
          ),
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
          }),
        );

        walletConnector?.on(
          'session_request',
          sessionRequestHandlerFactory(dispatch, uri),
        );

        let waitingFn = InteractionManager.runAfterInteractions;
        if (IS_TESTING === 'true') {
          waitingFn = setTimeout;
        }

        waitingFn(async () => {
          const { isInitialized, isUnlocked } = getState().keyring;
          if ((isInitialized, isUnlocked)) {
            await delay(300);
          }

          // We need to add a timeout in case the bridge is down
          // to explain the user what's happening
          const timeout = setTimeout(() => {
            const session = getState().walletconnect.sessions[uri];
            if (session.meta) {
              return;
            }
            dispatch(setSession({ uri, sessionInfo: { timedOut: true } }));
            routeParams.timedOut = true;
            Navigation.handleAction(
              Routes.WALLET_CONNECT_APPROVAL_SHEET,
              session.routeParams,
            );
          }, 20000);

          dispatch(setSession({ uri, sessionInfo: { timeout } }));

          const session = await dispatch(getSession({ uri })).unwrap();
          dispatch(setSession({ uri, sessionInfo: { navigated: true } }));
          Navigation.handleAction(
            Routes.WALLET_CONNECT_APPROVAL_SHEET,
            session.routeParams,
          );
        }, 2000);
      } catch (error) {
        const { timeout } = await dispatch(getSession({ uri })).unwrap();

        clearTimeout(timeout);
        captureException(error);
        console.log('Wallet Connect Connect Error:', error);
      }
    } catch (error) {
      const { timeout } = await dispatch(getSession({ uri })).unwrap();

      clearTimeout(timeout);
      captureException(error);
      console.log('Wallet Connect Missing FCM Error:', error);
    }
  },
);

const listenOnNewMessages = createAsyncThunk(
  'walletconnect/listenOnNewMessages',
  (walletConnector, { dispatch, getState }) => {
    walletConnector.on('call_request', async (error, payload) => {
      if (error) {
        throw error;
      }
      const { clientId, peerId, peerMeta } = walletConnector;
      const requestId = payload.id;

      if (notSigningMethod(payload.method)) {
        dispatch(
          walletConnectExecuteAndResponse({
            methodName: payload.method,
            args: payload.params,
            requestId,
            peerId,
            approve: true,
          }),
        );
        return;
      }

      const { pendingCallRequests } = getState().walletconnect;
      const request = !pendingCallRequests[requestId]
        ? await dispatch(
          addCallRequestToApprove({
            clientId,
            peerId,
            requestId,
            payload,
            peerMeta,
          }),
        ).unwrap()
        : null;

      if (request) {
        Navigation.handleAction(Routes.WALLET_CONNECT_CALL_REQUEST, {
          openAutomatically: true,
          transactionDetails: request,
        });
      }
    });
    walletConnector.on('disconnect', error => {
      if (error) {
        throw error;
      }
    });
    return walletConnector;
  },
);

export const walletConnectExecuteAndResponse = createAsyncThunk(
  'walletconnect/executeAndResponse',
  async (
    { peerId, requestId, methodName, args, opts, approve, error },
    { dispatch, getState },
  ) => {
    const callRequestResponseHandler = callRequestHandlerFactory(dispatch);
    const walletConnector = getState().walletconnect.walletConnectors[peerId];
    if (walletConnector) {
      try {
        if (!approve || error) {
          await walletConnector.rejectRequest({
            error: error || ERRORS.NOT_APPROVED,
            id: requestId,
          });
        }
        const { result, error: resultError } = await callRequestResponseHandler(
          methodName,
          opts,
          args,
        );

        if (result) {
          await walletConnector.approveRequest({ id: requestId, result });
        } else {
          await walletConnector.rejectRequest({
            error: resultError,
            id: requestId,
          });
        }
      } catch (e) {
        console.log('Failed to send request status to WalletConnect.', e);
      }
    } else {
      console.log(
        'WalletConnect session has expired while trying to send request status. Please reconnect.',
      );
    }
  },
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
  },
);

export const getPendingSessionRequest = createAsyncThunk(
  'walletconnect/getPendingsSessionRequest',
  ({ peerId }, { dispatch, getState }) => {
    const { pendingSessionRequests } = getState().walletconnect;
    return pendingSessionRequests[peerId];
  },
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
  },
);

export const addCallRequestToApprove = createAsyncThunk(
  'walletconnect/addCallRequestToApprove',
  async (
    { clientId, peerId, requestId, payload, peerMeta },
    { dispatch, getState },
  ) => {
    const { walletConnectors, pendingCallRequests } = getState().walletconnect;

    const walletConnector = walletConnectors[peerId];
    const chainId = walletConnector._chainId;

    const imageUrl = peerMeta?.url;
    const dappName = peerMeta?.name || 'Unknown Dapp';
    const dappUrl = peerMeta?.url || 'Unknown Url';
    const dappScheme = peerMeta?.scheme || null;

    const request = {
      clientId,
      dappName,
      dappScheme,
      dappUrl,
      displayDetails: {},
      imageUrl,
      payload,
      peerId,
      requestId,
    };

    const updatedRequests = { ...pendingCallRequests, [requestId]: request };
    dispatch(updateCallRequests(updatedRequests));

    return request;
  },
);

export const removeCallRequestToApprove = createAsyncThunk(
  'walletconnect/removeCallRequestToApprove',
  (requestId, { dispatch, getState }) => {
    const { pendingCallRequests } = getState().walletconnect;

    const updatedPendingRequests = pendingCallRequests;
    if (updatedPendingRequests[requestId]) {
      delete updatedPendingRequests[requestId];
    }
    dispatch(updateCallRequests(updatedPendingRequests));
  },
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
  },
);

export const getSession = createAsyncThunk(
  'walletconnect/getSession',
  ({ uri }, { dispatch, getState }) => {
    const { sessions } = getState().walletconnect;
    return sessions[uri];
  },
);

export const clearSession = createAsyncThunk(
  'walletconnect/clearSession',
  ({ uri }, { dispatch, getState }) => {
    const { sessions } = getState().walletconnect;
    const updatedSessions = { ...sessions, [uri]: {} };
    dispatch(updateSessions(updatedSessions));
  },
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
  },
);

export const getWalletConnector = createAsyncThunk(
  'walletconnect/getWalletConnector',
  ({ peerId }, { dispatch, getState }) => {
    const { walletConnectors } = getState().walletconnect;
    const walletConnector = walletConnectors[peerId];
    return walletConnector;
  },
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
  },
);

export const walletConnectApproveSession = createAsyncThunk(
  'walletconnect/approveSession',
  async (
    { peerId, callback, dappScheme, chainId, accountAddress },
    { dispatch, getState },
  ) => {
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
      listenOnNewMessages(walletConnector),
    ).unwrap();

    dispatch(
      setWalletConnector({
        walletConnector: listeningWalletConnector,
      }),
    );
    if (callback) {
      callback('connect', dappScheme);
    }
  },
);

export const walletConnectRejectSession = createAsyncThunk(
  'walletconnect/rejectSession',
  ([peerId, walletConnector], { dispatch }) => {
    walletConnector.rejectSession();
    dispatch(removePendingRequest({ peerId }));
  },
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
    clearState: (state, action) => {
      return {
        ...state,
        ...DEFAULT_STATE,
      };
    },
    setPendingRedirect: (state, action) => {
      return {
        ...state,
        pendingRedirect: true,
      };
    },
    removePendingRedirect: (state, action) => {
      return {
        ...state,
        pendingRedirect: false,
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
} = walletconnectSlice.actions;

export default walletconnectSlice.reducer;
