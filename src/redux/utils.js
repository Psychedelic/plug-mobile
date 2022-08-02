import { Principal } from '@dfinity/principal';
import { t } from 'i18next';

import { TOKEN_IMAGES, TOKENS } from '@/constants/assets';
import { ACTIVITY_STATUS } from '@/constants/business';
import { formatAssetBySymbol } from '@/utils/currencies';
import { parseToFloatAmount } from '@/utils/number';
import { recursiveParseBigint } from '@/utils/objects';

import { reset } from './slices/keyring';
import {
  asyncGetBalance,
  getContacts,
  getNFTs,
  getTransactions,
  setAssets,
  setAssetsAndLoading,
  setAssetsLoading,
  setCollections,
  setContacts,
  setContactsLoading,
  setTransactions,
  setTransactionsLoading,
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
  dispatch(reset());
  dispatch(setCollections([]));
  dispatch(setTransactions([]));
  dispatch(setAssets(DEFAULT_ASSETS));
};

export const getNewAccountData = async (dispatch, icpPrice, state) => {
  dispatch(setAssetsLoading(true));
  dispatch(setContacts([]));
  dispatch(setContactsLoading(true));
  dispatch(getNFTs());
  const assets = await asyncGetBalance(undefined, state, dispatch);
  dispatch(setAssetsAndLoading({ assets }));
  dispatch(setTransactionsLoading(true));
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

export const formatTransaction = (icpPrice, state) => trx => {
  const { principal, accountId } = state.keyring?.currentWallet;

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
  bridgeTimeout: { timeout: null, onBridgeContact: () => { } },
};
