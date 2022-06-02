import { ACTIVITY_STATUS } from '@/constants/business';
import { formatAssetBySymbol, TOKEN_IMAGES, TOKENS } from '@/utils/assets';
import { parseToFloatAmount } from '@/utils/number';

import { reset } from './slices/keyring';
import {
  getNFTs,
  getTransactions,
  privateGetAssets,
  setAssets,
  setAssetsAndLoading,
  setAssetsLoading,
  setCollections,
  setContacts,
  setTransactions,
  setTransactionsLoading,
} from './slices/user';

export const DEFAULT_ASSETS = [
  {
    symbol: 'ICP',
    name: 'ICP',
    amount: 0,
    value: 0,
    icon: 'dfinity',
  },
  {
    symbol: 'XTC',
    name: 'Cycles',
    amount: 0,
    value: 0,
    icon: 'xtc',
  },
  {
    symbol: 'WICP',
    name: 'Wrapped ICP',
    amount: 0,
    value: 0,
    icon: 'wicp',
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

export const recursiveParseBigint = obj =>
  Object.entries(obj).reduce(
    (acum, [key, val]) => {
      if (val instanceof Object) {
        const res = Array.isArray(val)
          ? val.map(el => recursiveParseBigint(el))
          : recursiveParseBigint(val);
        return { ...acum, [key]: res };
      }
      if (typeof val === 'bigint') {
        return { ...acum, [key]: parseInt(val.toString(), 10) };
      }
      return { ...acum, [key]: val };
    },
    { ...obj }
  );

export const resetStores = dispatch => {
  dispatch(reset());
  dispatch(setContacts([]));
  dispatch(setCollections([]));
  dispatch(setTransactions([]));
  dispatch(setAssets(DEFAULT_ASSETS));
};

export const getNewAccountData = async (dispatch, icpPrice, state) => {
  dispatch(setAssetsLoading(true));
  dispatch(getNFTs());
  const assets = await privateGetAssets(
    { refresh: true, icpPrice },
    state,
    dispatch
  );
  dispatch(setAssetsAndLoading({ assets }));
  dispatch(setTransactionsLoading(true));
  dispatch(getTransactions({ icpPrice }));
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
