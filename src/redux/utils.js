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
  setContactsLoading,
  setTransactions,
} from './slices/user';

export const DEFAULT_ASSETS = [
  {
    symbol: 'ICP',
    name: 'ICP',
    amount: 0,
    value: 0,
    icon: TOKEN_IMAGES.ICP,
  },
  {
    symbol: 'XTC',
    name: 'Cycles',
    amount: 0,
    value: 0,
    icon: TOKEN_IMAGES.XTC,
  },
  {
    symbol: 'WICP',
    name: 'Wrapped ICP',
    amount: 0,
    value: 0,
    icon: TOKEN_IMAGES.WICP,
  },
];

export const DEFAULT_TRANSACTION = {
  height: null,
  transactionId: null,
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

export const getNewAccountData = async (dispatch, icpPrice, state) => {
  dispatch(setContacts([]));
  dispatch(setContactsLoading(true));
  dispatch(getNFTs());
  dispatch(getBalance());
  dispatch(getTransactions({ icpPrice }));
  dispatch(getContacts())
    .unwrap()
    .then(() => dispatch(setContactsLoading(false)));
};

const parseTransactionObject = transactionObject => {
  const { amount, currency, token, sonicData } = transactionObject;

  const { decimals } = { ...currency, ...token, ...(sonicData?.token ?? {}) };
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
    to: details?.to?.principal,
    from: details?.from?.principal || caller,
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

export const formatContact = contact => ({
  image: contact.emoji[0],
  name: contact.name,
  id: contact.value?.PrincipalId?.toText(), //TODO Check this logic. What happens if principal doesnt come from the contact?
});

export const formatContactForController = contact => ({
  description: [t('placeholders.contactDescription')],
  emoji: [contact.image],
  name: contact.name,
  value: {
    PrincipalId: Principal.fromText(contact.id),
  },
});

export const filterICNSContacts = contact => contact.id;

export const DEFAULT_WALLET_CONNECT_STATE = {
  pendingRedirect: false,
  pendingSessionRequests: {},
  pendingCallRequests: {},
  walletConnectors: {},
  sessions: {},
  bridgeTimeout: { timeout: null, onBridgeContact: () => {} },
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
