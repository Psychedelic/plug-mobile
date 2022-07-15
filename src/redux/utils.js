import { t } from 'i18next';

import { TOKEN_IMAGES, TOKENS } from '@/constants/assets';
import { ACTIVITY_STATUS } from '@/constants/business';
import { formatAssetBySymbol } from '@/utils/currencies';
import { parseToFloatAmount } from '@/utils/number';

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

export const mapTransaction = (icpPrice, state) => trx => {
  const { principal, accountId } = state.keyring?.currentWallet;
  const { amount, currency, token, sonicData } = trx?.details || {};
  const { decimals } = {
    ...currency,
    ...token,
    ...(sonicData?.token ?? {}),
  };
  const isSonic = !!sonicData;

  const getSymbol = () => {
    if ('tokenRegistryInfo' in (trx?.details?.canisterInfo || [])) {
      return trx?.details?.canisterInfo.tokenRegistryInfo.symbol;
    }
    if (
      'nftRegistryInfo' in
      (trx?.details?.canisterInfo || trx?.details?.details || [])
    ) {
      return 'NFT';
    }
    if (trx?.details?.details?.name?.includes('Swap')) {
      return '';
    }
    return (
      trx?.details?.currency?.symbol ??
      sonicData?.token?.details?.symbol ??
      trx?.details?.details?.name ??
      ''
    );
  };

  const symbol = getSymbol();
  const parsedAmount = parseToFloatAmount(
    amount,
    decimals || TOKENS[sonicData?.token?.details?.symbol]?.decimals
  );
  const asset = formatAssetBySymbol(
    isSonic ? parsedAmount : amount,
    symbol,
    icpPrice
  );
  const isOwnTx = [principal, accountId].includes(trx?.caller);

  const getType = () => {
    const type = trx?.type;
    if (type.includes('transfer')) {
      return isOwnTx ? 'SEND' : 'RECEIVE';
    }
    if (type.includes('Liquidity')) {
      return `${type.includes('removeLiquidity') ? 'Remove' : 'Add'} Liquidity`;
    }
    return type.toUpperCase();
  };

  const canisterInfo =
    trx?.details?.tokenRegistryInfo ||
    trx?.details?.nftRegistryInfo ||
    trx?.details?.details?.nftRegistryInfo ||
    trx?.details?.details?.tokenRegistryInfo;

  const transaction = {
    ...asset,
    type: getType(),
    hash: trx?.hash,
    to: trx?.details?.to,
    from: trx?.details?.from || trx?.caller,
    date: new Date(trx?.timestamp),
    status: ACTIVITY_STATUS[trx?.details?.status],
    image:
      trx?.details?.details?.icon ||
      trx?.details?.icon ||
      TOKEN_IMAGES[symbol] ||
      canisterInfo?.icon ||
      '',
    symbol,
    canisterId: trx?.details?.canisterId,
    plug: null,
    canisterInfo,
    details: { ...trx?.details, caller: trx?.caller },
  };
  return transaction;
};

export const formatContact = contact => ({
  image: contact.emoji[0],
  name: contact.name,
  id: contact.value?.PrincipalId,
});

export const formatContactForController = contact => ({
  description: [t('placeholders.contactDescription')],
  emoji: [contact.image],
  name: contact.name,
  value: {
    PrincipalId: contact.id,
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
