import { blobFromBuffer } from '@dfinity/candid';
import { getAllNFTS, getTokens } from '@psychedelic/dab-js';
import {
  getCanisterInfo,
  IDLDecode,
} from '@psychedelic/plug-mobile-controller';

import ErrorState from '@/components/common/ErrorState';
import { XTC_FEE } from '@/constants/addresses';
import { CYCLES_PER_TC } from '@/constants/assets';
import { ASSET_CANISTER_IDS } from '@/constants/canister';
import { ERRORS } from '@/constants/walletconnect';
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
import { validateAccountId, validatePrincipalId } from '@/utils/ids';
import { validateCanisterId } from '@/utils/ids';
import Navigation from '@/utils/navigation';
import {
  isValidBigInt,
  validateAmount,
  validateFloatStrAmount,
} from '@/utils/number';
import { recursiveParseBigint, recursiveParsePrincipal } from '@/utils/objects';

import { base64ToBuffer } from './utilities';

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

export const validateTransferArgs = ({ to, amount, opts, strAmount }) => {
  let message = null;

  if (amount && !validateAmount(amount)) {
    message =
      'The transaction failed because the amount entered was invalid. \n';
  }

  if (strAmount && !validateFloatStrAmount(strAmount)) {
    message =
      'The transaction failed because the amount entered was invalid. \n';
  }

  if (!validatePrincipalId(to) && !validateAccountId(to)) {
    message =
      'The transaction failed because the destination address was invalid, it has to be a Principal ID or an Account ID.';
  }
  if (opts?.memo && !isValidBigInt(opts?.memo)) {
    message =
      'The transaction failed because the memo entered was invalid. It needs to be a valid BigInt \n';
  }
  return message ? ERRORS.CLIENT_ERROR(message) : null;
};

export const validateBurnArgs = ({ to, amount }) => {
  let message = null;

  if (!validateAmount(amount)) {
    message =
      'The transaction failed because the amount entered was invalid. \n';
  }

  if (!validateCanisterId(to)) {
    message =
      'The transaction failed because the destination address was invalid, it has to be a Canister ID';
  }
  if (amount < XTC_FEE * CYCLES_PER_TC) {
    message = 'You cannot burn less XTC than the minimum fee';
  }
  return message ? ERRORS.CLIENT_ERROR(message) : null;
};

export const validateTransactions = transactions => {
  let message = null;

  if (Array.isArray(transactions)) {
    return ErrorState.CLIENT_ERROR(
      'The batch transaction failes becuase transactions must be an array ',
    );
  }

  if (transactions.every(tx => tx.sender)) {
    message =
      'The batch transaction failed because each transaction must have a sender';
  }

  if (
    transactions.every(tx => tx.canisterId && validateCanisterId(tx.canisterId))
  ) {
    message =
      'The batch transaction failed because each transaction must have a valid canisterId';
  }

  if (transactions.every(tx => tx.methodName)) {
    message =
      'The batch transaction failed because each transaction must have a valid methodName';
  }

  return message ? ERRORS.CLIENT_ERROR(message) : null;
};

export const generateRequestInfo = args => {
  const decodedArguments = recursiveParseBigint(
    IDLDecode(blobFromBuffer(base64ToBuffer(args.arg))),
  );

  return {
    ...args,
    arguments: args.arg,
    decodedArguments,
    type: 'call',
  };
};

export const validateBatchTx = (
  savedTxInfo,
  { canisterId, methodName, arguments: arg },
) => {
  if (
    !savedTxInfo ||
    savedTxInfo.canisterId !== canisterId ||
    savedTxInfo.methodName !== methodName
  ) {
    // if you dont have savedTxInfo
    // or the methodName or cannotisterId is different from the savedTxInfo
    // the batch tx is not valid
    return false;
  }

  if (savedTxInfo.args) {
    // if there is args saved in the savedTxInfo
    // coming args must be the same as the saved args
    // args and savedTxInfo.args gonna be base64 encoded
    return savedTxInfo.args === arg;
  }

  return true;
};
