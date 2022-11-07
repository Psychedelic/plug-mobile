import { Principal } from '@dfinity/principal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Flatted from 'flatted';
import { t } from 'i18next';

import { TOKEN_IMAGES, TOKENS } from '@/constants/assets';
import { ACTIVITY_STATUS } from '@/constants/business';
import {
  KEYRING_KEYS_IN_STORAGE,
  KEYRING_STORAGE_KEY,
} from '@/constants/keyring';
import { formatAssetBySymbol, parseToFloatAmount } from '@/utils/currencies';
import { validateAccountId, validatePrincipalId } from '@/utils/ids';
import { recursiveParseBigint } from '@/utils/objects';

import { clear } from './slices/keyring';
import {
  getBalance,
  getContacts,
  getNFTs,
  getTransactions,
  setBalance,
  setCollections,
  setContacts,
  setTransactions,
} from './slices/user';

export const DEFAULT_ASSETS = [
  {
    symbol: 'ICP',
    name: 'ICP',
    amount: 0,
    value: 0,
    icon: TOKEN_IMAGES.ICP,
    decimals: TOKENS.ICP.decimals,
    canisterId: TOKENS.ICP.canisterId,
    fee: TOKENS.ICP.fee,
  },
  {
    symbol: 'XTC',
    name: 'Cycles',
    amount: 0,
    value: 0,
    icon: TOKEN_IMAGES.XTC,
    decimals: TOKENS.XTC.decimals,
    canisterId: TOKENS.XTC.canisterId,
    fee: TOKENS.XTC.fee,
  },
  {
    symbol: 'WICP',
    name: 'Wrapped ICP',
    amount: 0,
    value: 0,
    icon: TOKEN_IMAGES.WICP,
    decimals: TOKENS.WICP.decimals,
    canisterId: TOKENS.WICP.canisterId,
    fee: TOKENS.WICP.fee,
  },
];

export const DEFAULT_TRANSACTION = {
  status: null,
};

export const TRANSACTION_STATUS = {
  success: 'success',
  error: 'error',
};

export const resetStores = dispatch => {
  dispatch(clear());
  dispatch(setCollections([]));
  dispatch(setTransactions([]));
  dispatch(setBalance(DEFAULT_ASSETS));
};

export const getNewAccountData = async (dispatch, icpPrice) => {
  dispatch(setContacts([]));
  dispatch(getNFTs());
  dispatch(getBalance());
  dispatch(getTransactions({ icpPrice }));
  dispatch(getContacts());
};

const parseTransactionObject = transactionObject => {
  const { amount, currency, token, sonicData, canisterInfo } =
    transactionObject;

  const { decimals } = {
    ...currency,
    ...token,
    ...(sonicData?.token ?? {}),
    ...(canisterInfo?.tokenRegistryInfo?.details ?? {}),
  };
  // TODO: Decimals are currently not in DAB. Remove once they are added.
  const parsedAmount = parseToFloatAmount(
    amount,
    decimals || TOKENS[sonicData?.token?.details?.symbol]?.decimals
  );

  return {
    ...transactionObject,
    amount: parsedAmount,
  };
};

const parseTransaction = transaction => {
  const { details } = transaction;
  const { fee } = details;

  const parsedDetails = parseTransactionObject(details);
  let parsedFee = fee;

  if (fee instanceof Object && ('token' in fee || 'currency' in fee)) {
    parsedFee = parseTransactionObject(fee);
  }

  return {
    ...transaction,
    details: {
      ...parsedDetails,
      fee: parsedFee,
    },
  };
};

const getTransactionSymbol = details => {
  if (!details) {
    return '';
  }
  if ('tokenRegistryInfo' in (details?.canisterInfo || [])) {
    return details?.canisterInfo.tokenRegistryInfo.symbol;
  }
  if ('nftRegistryInfo' in (details?.canisterInfo || [])) {
    return 'NFT';
  }
  return (
    details?.currency?.symbol ??
    details?.sonicData?.token?.details?.symbol ??
    details?.details?.name ??
    ''
  );
};

const getTransactionType = (type, isOwnTx) => {
  if (!type) {
    return '';
  }
  if (type.includes('transfer')) {
    return isOwnTx ? 'SEND' : 'RECEIVE';
  }
  if (type.includes('Liquidity')) {
    return `${type.includes('removeLiquidity') ? 'Remove' : 'Add'} Liquidity`;
  }
  return type.toUpperCase();
};

export const formatTransaction = (icpPrice, currentWallet) => trx => {
  const { principal, accountId } = currentWallet;

  let parsedTransaction = recursiveParseBigint(parseTransaction(trx));
  const { details, hash, caller, timestamp } = parsedTransaction || {};
  const isOwnTx = [principal, accountId].includes(caller);

  const symbol = getTransactionSymbol(details);
  const asset = formatAssetBySymbol(details?.amount, symbol, icpPrice);
  const type = getTransactionType(parsedTransaction?.type, isOwnTx);

  const transaction = {
    amount: asset.amount,
    value: asset.value,
    icon: asset.icon,
    type,
    hash,
    to: details?.to?.icns || details?.to?.principal,
    from: details?.from?.icns || details?.from?.principal || caller,
    date: new Date(timestamp),
    status: ACTIVITY_STATUS[details?.status],
    image: details?.canisterInfo?.icon || TOKEN_IMAGES[symbol] || '',
    symbol,
    canisterId: details?.canisterId,
    plug: null,
    canisterInfo: details?.canisterInfo,
    details: {
      ...details,
      caller,
    },
  };
  return transaction;
};

export const formatContact = contact => {
  const [id] = Object.values(contact.value);

  return {
    image: contact.emoji[0],
    name: contact.name,
    id: contact.value?.PrincipalId?.toText() || `${id}`,
  };
};

export const formatContactForController = contact => ({
  description: [t('placeholders.contactDescription')],
  emoji: [contact.image],
  name: contact.name,
  value: contactCreateValueObj(contact.id),
});

export const contactCreateValueObj = currentId => {
  if (validatePrincipalId(currentId)) {
    return { PrincipalId: Principal.fromText(currentId) };
  }

  if (validateAccountId(currentId)) {
    return { AccountId: currentId };
  }

  return { Icns: currentId };
};

export const DEFAULT_WALLET_CONNECT_STATE = {
  pendingRedirect: {},
  pendingCallRequests: {},
  sessions: {},
  bridgeTimeouts: {},
};

export const migrateData = async () => {
  // remove unnecesary persisted data
  AsyncStorage.removeItem('persist:root');

  const oldState = {};
  await Promise.all(
    KEYRING_KEYS_IN_STORAGE.map(async k => {
      const flattedValue = await AsyncStorage.getItem(k);
      oldState[k] = flattedValue ? Flatted.parse(flattedValue) : undefined;
    })
  );
  await AsyncStorage.setItem(KEYRING_STORAGE_KEY, JSON.stringify(oldState));
  return oldState;
};

export const formatWallets = wallets =>
  Object.keys(wallets).map(key => wallets[key]);
