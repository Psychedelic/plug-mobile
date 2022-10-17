import { blobFromBuffer } from '@dfinity/candid';
import PlugController from '@psychedelic/plug-controller';
import { randomBytes } from 'crypto';
import { fetch } from 'react-native-fetch-api';

import { XTC_FEE } from '@/constants/addresses';
import { CYCLES_PER_TC } from '@/constants/assets';
import { ASSET_CANISTER_IDS } from '@/constants/canister';
import {
  CONNECTION_STATUS,
  ERRORS,
  SIGNING_METHODS,
} from '@/constants/walletconnect';
import {
  ConnectionModule,
  InformationModule,
  TransactionModule,
} from '@/modules';
import {
  getApps,
  getBatchTransactions,
  setApps,
  setBatchTransactions,
  setProtectedIds,
} from '@/modules/storageManager';
import Routes from '@/navigation/Routes';
import {
  addBridgeTimeout,
  getSession,
  setSession,
  walletConnectApproveSession,
  walletConnectRejectSession,
} from '@/redux/slices/walletconnect';
import { getDabNfts, getDabTokens } from '@/services/DAB';
import { addBatchTransaction, addDelegation } from '@/services/SignerServer';
import { validateAccountId, validatePrincipalId } from '@/utils/ids';
import { validateCanisterId } from '@/utils/ids';
import { navigate } from '@/utils/navigation';
import {
  isValidBigInt,
  validateAmount,
  validateFloatStrAmount,
} from '@/utils/number';
import { recursiveParseBigint } from '@/utils/objects';

import { base64ToBuffer } from './utilities';

export const responseSessionRequest = async (meta, dispatch) => {
  const {
    approved,
    chainId,
    accountAddress,
    peerId,
    dappScheme,
    requestId,
    dappName,
    dappUrl,
  } = meta;
  const { walletConnector } = await dispatch(getSession({ peerId })).unwrap();

  if (approved) {
    const timeout = setTimeout(() => {
      navigate(Routes.WALLET_CONNECT_ERROR, {
        dappName,
        dappUrl,
      });
    }, 20000);

    await dispatch(addBridgeTimeout({ requestId, timeout }));

    await dispatch(
      walletConnectApproveSession({
        peerId,
        dappScheme,
        chainId,
        accountAddress,
      })
    );
  } else if (!approved) {
    await dispatch(walletConnectRejectSession({ peerId, walletConnector }));
  }

  await dispatch(setSession({ peerId, sessionInfo: { pending: false, meta } }));
};

export const sessionRequestHandler = async ({ error, payload, requestId }) => {
  if (error) {
    throw error;
  }
  const { peerId, peerMeta, chainId } = payload.params[0];

  const dappName = peerMeta?.name;
  const dappUrl = peerMeta?.url;
  const dappScheme = peerMeta?.scheme;
  const imageUrl = peerMeta?.icons?.[0];

  navigate(Routes.WALLET_CONNECT_INITIAL_CONNECTION, {
    chainId,
    dappName,
    dappScheme,
    dappUrl,
    peerId,
    imageUrl,
    requestId,
  });
};

export const callRequestHandlerFactory = (dispatch, getState) => {
  const modules = [
    ...TransactionModule(dispatch, getState),
    ...InformationModule(dispatch, getState),
    ...ConnectionModule(dispatch, getState),
  ];
  const walletConnectHandlers = modules.reduce(
    (acum, { methodName, handler, executor }) => ({
      ...acum,
      [methodName]: [handler, executor],
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

const getLeafValues = (data, values = []) => {
  if (!data) {
    return [...values, data];
  }
  if (typeof data !== 'object') {
    return [data];
  }
  return [
    ...values,
    ...Object.values(data).flatMap(v => getLeafValues(v, values)),
  ];
};

const doObjectValuesMatch = (obj1 = {}, obj2 = {}) => {
  const leafValues1 = getLeafValues(obj1) || [];
  const leafValues2 = getLeafValues(obj2) || [];
  return leafValues1.every(v => leafValues2.includes(v));
};

export const generateRequestInfo = (args, preDecodedArgs) => {
  const decodedArguments = recursiveParseBigint(
    PlugController.IDLDecode(blobFromBuffer(base64ToBuffer(args.arg)))
  );
  const shouldWarn = !doObjectValuesMatch(preDecodedArgs, decodedArguments);
  return {
    canisterId: args.canisterId,
    methodName: args.methodName,
    sender: args.sender,
    arguments: args.arg,
    decodedArguments: preDecodedArgs || decodedArguments,
    type: 'call',
    shouldWarn,
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

export const needSign = (methodName, args) => {
  if (methodName === 'requestCall' && args[2]) {
    return false;
  } else if (SIGNING_METHODS.includes(methodName)) {
    return true;
  }

  return false;
};

export const getWhitelistWithInfo = async whitelist => {
  const canisterInfo = await fetchCanistersInfo(whitelist);

  return canisterInfo.concat(whitelist.map(wh => ({ canisterId: wh }))).reduce(
    (acum, info) => ({
      ...acum,
      [info.canisterId]: { ...info, ...acum[info.canisterId] },
    }),
    {}
  );
};

export const updateWhitelist = async (
  whitelist,
  currentWalletId,
  status,
  url
) => {
  const apps = await getApps(currentWalletId);
  const date = new Date().toISOString();

  const newApps = {
    ...apps,
    [url]: {
      ...apps[url],
      status: status || CONNECTION_STATUS.rejected,
      date,
      whitelist: { ...apps[url]?.whitelist, ...whitelist },
      events: [
        ...(apps[url]?.events || []),
        {
          status: status || CONNECTION_STATUS.rejected,
          date,
        },
      ],
    },
  };

  await setApps(currentWalletId, newApps);
};

export const resolveBatchTransactionIos = async ({
  keyring,
  transactions,
  metadata,
}) => {
  const agent = await keyring.getAgent();
  const host = agent._host;
  const { batchTxId, derPublicKey } = await addBatchTransaction(
    transactions.map(tx => ({
      canisterId: tx.canisterId,
      methodName: tx.methodName,
      args: tx.arguments,
    })),
    metadata,
    host
  );

  const bufferPublicKey = base64ToBuffer(derPublicKey);

  const delegationChain = await keyring.delegateIdentity({
    to: bufferPublicKey,
    targets: transactions.map(tx => tx.canisterId),
  });

  await addDelegation(batchTxId, delegationChain);

  return batchTxId;
};

export const resolveBatchTransactionAndroid = async ({ transactions }) => {
  const savedBatchTransactions = await getBatchTransactions();
  const newBatchTransactionId = randomBytes(16).toString('hex');
  const updatedBatchTransactions = {
    ...savedBatchTransactions,
    [newBatchTransactionId]: transactions.map(tx => ({
      canisterId: tx.canisterId,
      methodName: tx.methodName,
      args: tx.arguments,
    })),
  };
  await setBatchTransactions(updatedBatchTransactions);

  return newBatchTransactionId;
};
