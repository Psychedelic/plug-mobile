import { HttpAgent } from '@dfinity/agent';
import { blobFromBuffer } from '@dfinity/candid';
import { getAllNFTS, getTokens } from '@psychedelic/dab-js';
import PlugController from '@psychedelic/plug-controller';
import { fetch } from 'react-native-fetch-api';

import { XTC_FEE } from '@/constants/addresses';
import { CYCLES_PER_TC } from '@/constants/assets';
import { ASSET_CANISTER_IDS } from '@/constants/canister';
import { IC_URL_HOST } from '@/constants/general';
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

export const connectionRequestResponseHandlerFactory = (dispatch, uri) => {
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
      getSession({ uri })
    ).unwrap();

    if (approved) {
      dispatch(setPendingSessionRequest({ peerId, walletConnector }));
      dispatch(
        walletConnectApproveSession({
          peerId,
          dappScheme,
          chainId,
          accountAddress,
        })
      );
    } else if (!timedOut) {
      await dispatch(walletConnectRejectSession(peerId, walletConnector));
    }
  };
};

export const sessionRequestHandler = async (
  { dispatch, uri },
  { error, payload }
) => {
  if (error) {
    throw error;
  }
  const { peerId, peerMeta, chainId } = payload.params[0];

  const dappName = peerMeta?.name;
  const dappUrl = peerMeta?.url;
  const dappScheme = peerMeta?.scheme;
  const dappImageUrl = peerMeta?.icons?.[0];

  const meta = {
    chainId,
    dappName,
    dappScheme,
    dappUrl,
    peerId,
    dappImageUrl,
  };

  await dispatch(setSession({ uri, sessionInfo: { meta } }));

  Navigation.handleAction(Routes.WALLET_CONNECT_INITIAL_CONNECTION, {
    uri,
    meta,
  });
};

export const callRequestHandlerFactory = (dispatch, getState) => {
  const modules = [
    ...TransactionModule(dispatch, getState),
    ...InformationModule(dispatch, getState),
    ...ConnectionModule(dispatch, getState),
  ];
  const walletConnectHandlers = modules.reduce(
    (acum, handlerObj) => ({
      ...acum,
      [handlerObj.methodName]: [handlerObj.handler, handlerObj.executor],
    }),
    {}
  );

  return methodName => {
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
      collection.principal_id.toString()
    ),
    ...(tokenCanisters || []).map(token => token.principal_id.toString()),
    ...ASSET_CANISTER_IDS,
  ];
  await setProtectedIds(PROTECTED_IDS);
};

export const getDabTokens = async () => {
  const agent = new HttpAgent({ fetch, host: IC_URL_HOST });
  const tokens = await getTokens({ agent });
  const parsedTokens = (tokens || []).map(token =>
    recursiveParseBigint(recursiveParsePrincipal(token))
  );
  return parsedTokens.map(token => ({
    ...token,
    canisterId: token?.principal_id,
  }));
};

export const getDabNfts = async () => {
  const agent = new HttpAgent({ fetch, host: IC_URL_HOST });
  return getAllNFTS({ agent });
};

export const fetchCanistersInfo = async whitelist => {
  if (whitelist && whitelist.length > 0) {
    try {
      const canistersInfo = await PlugController.getMultipleCanisterInfo(
        whitelist,
        undefined,
        fetch
      );
      const sortedCanistersInfo = canistersInfo.sort((a, b) => {
        if (a.name && !b.name) {
          return -1;
        }
        return 1;
      });

      return sortedCanistersInfo;
    } catch (e) {
      console.log('error fetching canisters info', e);
    }
  }

  return [];
};

export const validateTransferArgs = ({ to, amount, opts, strAmount }) => {
  let message = null;

  if (amount && !validateAmount(amount)) {
    message = 'The transaction failed because the amount entered was invalid.';
  }

  if (strAmount && !validateFloatStrAmount(strAmount)) {
    message = 'The transaction failed because the amount entered was invalid.';
  }

  if (!validatePrincipalId(to) && !validateAccountId(to)) {
    message =
      'The transaction failed because the destination address was invalid, it has to be a Principal ID or an Account ID.';
  }
  if (opts?.memo && !isValidBigInt(opts?.memo)) {
    message =
      'The transaction failed because the memo entered was invalid. It needs to be a valid BigInt';
  }
  return message ? ERRORS.CLIENT_ERROR(message) : null;
};

export const validateBurnArgs = ({ to, amount }) => {
  let message = null;

  if (!validateAmount(amount)) {
    message = 'The transaction failed because the amount entered was invalid.';
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

  if (!Array.isArray(transactions)) {
    return ERRORS.CLIENT_ERROR(
      'The batch transaction failes becuase transactions must be an array '
    );
  }

  if (!transactions.every(tx => tx.sender)) {
    message =
      'The batch transaction failed because each transaction must have a sender';
  }

  if (
    !transactions.every(
      tx => tx.canisterId && validateCanisterId(tx.canisterId)
    )
  ) {
    message =
      'The batch transaction failed because each transaction must have a valid canisterId';
  }

  if (!transactions.every(tx => tx.methodName)) {
    message =
      'The batch transaction failed because each transaction must have a valid methodName';
  }

  return message ? ERRORS.CLIENT_ERROR(message) : null;
};

export const generateRequestInfo = args => {
  const decodedArguments = recursiveParseBigint(
    PlugController.IDLDecode(blobFromBuffer(base64ToBuffer(args.arg)))
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
  { canisterId, methodName, arguments: arg }
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
