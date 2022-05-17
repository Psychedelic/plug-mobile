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
  IS_TESTING,
  PLUG_DESCRIPTION,
} from '@/constants/walletconnect';
import Routes from '@/navigation/Routes';
import Navigation from '@/utils/navigation';
import { delay } from '@/utils/utilities';
import {
  getAllValidWalletConnectSessions,
  notSigningMethod,
  saveWalletConnectSession,
  walletConnectHandleMethod,
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
    let timeout = null;
    let walletConnector = null;
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

        walletConnector = new WalletConnect({
          clientMeta,
          uri,
        });
        let meta = null;
        let navigated = false;
        let timedOut = false;
        let routeParams = {
          callback: async ({
            approved,
            chainId,
            accountAddress,
            peerId,
            dappScheme,
            dappName,
            dappUrl,
          }) => {
            if (approved) {
              dispatch(setPendingRequest({ peerId, walletConnector }));
              dispatch(
                walletConnectApproveSession({
                  peerId,
                  callback,
                  dappScheme,
                  chainId,
                  accountAddress,
                }),
              );
            } else if (!timedOut) {
              await dispatch(
                walletConnectRejectSession(peerId, walletConnector),
              );
              callback?.('reject', dappScheme);
            } else {
              callback?.('timedOut', dappScheme);
              const url = new URL(uri);
              const bridge = qs.parse(url?.query)?.bridge;
            }
          },
          receivedTimestamp,
        };

        walletConnector?.on('session_request', (error, payload) => {
          clearTimeout(timeout);
          if (error) {
            captureException(error);
            throw error;
          }
          const { peerId, peerMeta, chainId } = payload.params[0];

          const dappName = peerMeta?.name;
          const dappUrl = peerMeta?.url;
          const dappScheme = peerMeta?.scheme;

          meta = {
            chainId,
            dappName,
            dappScheme,
            dappUrl,
            peerId,
          };

          // If we already showed the sheet
          // We need navigate to the same route with the updated params
          // which now includes the meta
          if (navigated && !timedOut) {
            routeParams = { ...routeParams, meta, timeout };
            Navigation.handleAction(
              Routes.WALLET_CONNECT_APPROVAL_SHEET,
              routeParams,
            );
          }
        });

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
          timeout = setTimeout(() => {
            if (meta) {
              return;
            }
            timedOut = true;
            routeParams = { ...routeParams, timedOut };
            Navigation.handleAction(
              Routes.WALLET_CONNECT_APPROVAL_SHEET,
              routeParams,
            );
          }, 20000);

          // If we have the meta, send it
          if (meta) {
            routeParams = { ...routeParams, meta };
          }
          navigated = true;
          Navigation.handleAction(
            Routes.WALLET_CONNECT_APPROVAL_SHEET,
            routeParams,
          );
        }, 2000);
      } catch (error) {
        clearTimeout(timeout);
        captureException(error);
        console.log('Wallet Connect Connect Error:', error);
      }
    } catch (error) {
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
        walletConnectHandleMethod(payload.method, payload.params, dispatch)
          .then(result =>
            walletConnector.approveRequest({
              id: payload.id,
              result,
            }),
          )
          .catch(e =>
            walletConnector.rejectRequest({
              id: payload.id,
              e,
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

export const setPendingRequest = createAsyncThunk(
  'walletconnect/setPendingRequest',
  ({ peerId, walletConnector }, { dispatch, getState }) => {
    const state = getState();
    const { pendingRequests } = state.walletconnect;
    const updatedPendingRequests = {
      ...pendingRequests,
      [peerId]: walletConnector,
    };
    dispatch(updateRequests(updatedPendingRequests));
  },
);

export const getPendingRequest = createAsyncThunk(
  'walletconnect/getPendingRequest',
  ({ peerId }, { dispatch, getState }) => {
    const { pendingRequests } = getState().walletconnect;
    return pendingRequests[peerId];
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
    dispatch(updateRequests(updatedPendingRequests));
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
    const { pendingRequests } = getState().walletconnect;
    const walletConnector = pendingRequests[peerId];

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

export const walletConnectSendStatus = createAsyncThunk(
  'walletconnect/sendStatus',
  async ({ peerId, requestId, response }, { dispatch, getState }) => {
    const walletConnector = getState().walletconnect.walletConnectors[peerId];
    if (walletConnector) {
      const { result, error } = response;
      try {
        if (result) {
          await walletConnector.approveRequest({ id: requestId, result });
        } else {
          await walletConnector.rejectRequest({
            error,
            id: requestId,
          });
        }
      } catch (e) {
        console.log('Failed to send request status to WalletConnect.');
      }
    } else {
      console.log(
        'WalletConnect session has expired while trying to send request status. Please reconnect.',
      );
    }
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
    updateRequests: (state, action) => {
      return {
        ...state,
        pendingRequests: action.payload,
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
  updateRequests,
  updateConnectors,
  clearState,
  setPendingRedirect,
  removePendingRedirect,
} = walletconnectSlice.actions;

export default walletconnectSlice.reducer;
