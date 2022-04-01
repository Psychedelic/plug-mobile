import { reset } from './slices/keyring';
import {
  getNFTs,
  setAssets,
  setContacts,
  setCollections,
  getTransactions,
  privateGetAssets,
  setTransactions,
  setAssetsLoading,
  setAssetsAndLoading,
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
    { ...obj },
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
    dispatch,
  );
  dispatch(setAssetsAndLoading({ assets }));
  dispatch(setTransactionsLoading(true));
  dispatch(getTransactions({ icpPrice }));
};
