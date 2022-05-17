import { SIGNING_METHODS } from '@/constants/walletconnect';
import ConnectionModule from '@/modules/connection';
import InformationModule from '@/modules/information';
import TransactionModule from '@/modules/transaction';
import Routes from '@/navigation/Routes';
import {
  getSession,
  setPendingSessionRequest,
  setSession,
  walletConnectApproveSession,
  walletConnectRejectSession,
} from '@/redux/slices/walletconnect';
import Navigation from '@/utils/navigation';

export const notSigningMethod = method => !SIGNING_METHODS.includes(method);

export const connectionRequestResponseHandlerFactory = (
  dispatch,
  callback,
  uri,
) => {
  return async ({
    approved,
    chainId,
    accountAddress,
    peerId,
    dappScheme,
    dappName,
    dappUrl,
  }) => {
    const { walletConnector, timedOut } = await dispatch(
      getSession({ uri }),
    ).unwrap();

    if (approved) {
      dispatch(setPendingSessionRequest({ peerId, walletConnector }));
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
      await dispatch(walletConnectRejectSession(peerId, walletConnector));
      callback?.('reject', dappScheme);
    } else {
      callback?.('timedOut', dappScheme);
    }
  };
};

export const sessionRequestHandlerFactory = (dispatch, uri) => {
  return async (error, payload) => {
    const { timeout, navigated, timedOut, routeParams } = await dispatch(
      getSession({ uri }),
    ).unwrap();
    clearTimeout(timeout);
    if (error) {
      throw error;
    }
    const { peerId, peerMeta, chainId } = payload.params[0];

    const dappName = peerMeta?.name;
    const dappUrl = peerMeta?.url;
    const dappScheme = peerMeta?.scheme;

    const meta = {
      chainId,
      dappName,
      dappScheme,
      dappUrl,
      peerId,
    };

    dispatch(setSession({ uri, sessionInfo: { meta } }));

    // If we already showed the sheet
    // We need navigate to the same route with the updated params
    // which now includes the meta
    if (navigated && !timedOut) {
      Navigation.handleAction(Routes.WALLET_CONNECT_APPROVAL_SHEET, {
        ...routeParams,
        meta,
        timedOut,
      });
    }
  };
};

export const callRequestHandlerFactory = dispatch => {
  const modules = [
    ...TransactionModule(dispatch),
    ...InformationModule(dispatch),
    ...ConnectionModule(dispatch),
  ];

  const walletConnectHandlers = modules.reduce(
    (acum, handlerObj) => ({
      ...acum,
      [handlerObj.methodName]: handlerObj.handler,
    }),
    {},
  );

  return (methodName, opts, args) => {
    const handler = walletConnectHandlers[methodName];
    if (!handler) {
      return;
    }

    return handler(opts, ...args);
  };
};
