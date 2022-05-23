import { getAllNFTS, getTokens } from '@psychedelic/dab-js';
import { getCanisterInfo } from '@psychedelic/plug-mobile-controller';

import { ASSET_CANISTER_IDS } from '@/constants/canister';
import { SIGNING_METHODS } from '@/constants/walletconnect';
import {
  ConnectionModule,
  InformationModule,
  TransactionModule,
} from '@/modules';
import { setProtectedIds } from '@/modules/storageManager';
import Routes from '@/navigation/Routes';
import {
  getSession,
  setPendingSessionRequest,
  setSession,
  walletConnectApproveSession,
  walletConnectRejectSession,
} from '@/redux/slices/walletconnect';
import Navigation from '@/utils/navigation';
import { recursiveParseBigint, recursiveParsePrincipal } from '@/utils/objects';

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
      [handlerObj.methodName]: [handlerObj.handler, handlerObj.executor],
    }),
    {},
  );

  return methodName => {
    console.log(methodName, walletConnectHandlers);
    const handler = walletConnectHandlers[methodName];
    if (!handler) {
      return [];
    }

    return handler;
  };
};

export const initializeProtectedIds = async () => {
  const nftCanisters = await getDabNfts();
  const tokenCanisters = await getDabTokens();
  const PROTECTED_IDS = [
    ...(nftCanisters || []).map(collection =>
      collection.principal_id.toString(),
    ),
    ...(tokenCanisters || []).map(token => token.principal_id.toString()),
    ...ASSET_CANISTER_IDS,
  ];
  setProtectedIds(PROTECTED_IDS);
};

export const getDabTokens = async () => {
  const tokens = await getTokens({});
  const parsedTokens = (tokens || []).map(token =>
    recursiveParseBigint(recursiveParsePrincipal(token)),
  );
  return parsedTokens.map(token => ({
    ...token,
    canisterId: token?.principal_id,
  }));
};

export const getDabNfts = async () => getAllNFTS({});

export const fetchCanistersInfo = async whitelist => {
  if (whitelist && whitelist.length > 0) {
    const canistersInfo = await Promise.all(
      whitelist.map(async id => {
        let canisterInfo = { id };

        try {
          const fetchedCanisterInfo = await getCanisterInfo(id);
          canisterInfo = { id, ...fetchedCanisterInfo };
        } catch (error) {
          console.error(error);
        }

        return canisterInfo;
      }),
    );

    const sortedCanistersInfo = canistersInfo.sort((a, b) => {
      if (a.name && !b.name) {
        return -1;
      }
      return 1;
    });

    return sortedCanistersInfo;
  }

  return [];
};
