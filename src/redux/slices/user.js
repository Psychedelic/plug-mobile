import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ACTIVITY_STATUS } from '../../screens/Profile/components/constants';
import { formatAssets, formatAssetBySymbol } from '../../utils/assets';
import { TOKEN_IMAGES } from '../../utils/assets';
import {
  DEFAULT_ASSETS,
  TRANSACTION_STATUS,
  recursiveParseBigint,
} from '../constants';

const DEFAULT_TRANSACTION = {
  height: null,
  transactionId: null,
  status: null,
};

const DEFAULT_STATE = {
  assets: DEFAULT_ASSETS,
  assetsLoading: false,
  contacts: [],
  transaction: DEFAULT_TRANSACTION,
  transactions: [],
  transactionsLoading: false,
  selectedNFT: {},
  collections: [],
};

export const sendToken = createAsyncThunk(
  'keyring/sendToken',
  async (params, { getState }) => {
    try {
      const { to, amount, canisterId, opts } = params;
      const state = getState();
      console.log('SEND:', Number(amount).toFixed(8));
      const { height, transactionId } = await state.keyring.instance?.send(
        to,
        Number(amount).toFixed(8), // TODO: Use token decimals when possible
        canisterId,
        opts,
      );
      return {
        response: {
          height: parseInt(height?.toString?.(), 10),
          transactionId: parseInt(transactionId?.toString?.(), 10),
        },
        status: TRANSACTION_STATUS.success,
      };
    } catch (e) {
      console.log('sendToken', e);
      return {
        error: e.message,
        status: TRANSACTION_STATUS.error,
      };
    }
  },
);

export const burnXtc = createAsyncThunk(
  'keyring/burnXtc',
  async (params, { getState }) => {
    try {
      const state = getState();
      const response = await state.keyring.instance?.burnXTC(params);
      return {
        response: recursiveParseBigint(response),
        status: TRANSACTION_STATUS.success,
      };
    } catch (e) {
      console.log('burnXtc', e);
      return {
        error: e.message,
        status: TRANSACTION_STATUS.error,
      };
    }
  },
);

export const setAssetsAndTransactions = createAsyncThunk(
  'keyring/setAssetsAndTransactions',
  async (params, { dispatch }) => {
    const { transactions, assets } = params;
    dispatch(setAssetsAndLoading({ assets }));
    dispatch(setTransactions(transactions || []));
    dispatch(setTransactionsLoading(false));
  },
);

export const setAssetsAndLoading = createAsyncThunk(
  'keyring/setAssetsAndTransactions',
  async (params, { dispatch }) => {
    const { assets } = params;
    const formattedAssets = formatAssets(assets);
    dispatch(
      setAssets(formattedAssets?.length > 0 ? formattedAssets : DEFAULT_ASSETS),
    );
    dispatch(setAssetsLoading(false));
  },
);

export const getAssets = createAsyncThunk(
  'keyring/getAssets',
  async (params, { getState }) => {
    return privateGetAssets(params, getState());
  },
);

export const privateGetAssets = async (params, state) => {
  try {
    const { refresh, icpPrice } = params;
    const { instance } = state.keyring;
    const response = await instance?.getState();
    const { wallets, currentWalletId } = response || {};
    let assets = wallets?.[currentWalletId]?.assets || [];
    if (
      !assets.length ||
      assets?.every(asset => parseFloat(asset.amount) <= 0) ||
      refresh
    ) {
      assets = await instance?.getBalance();
    } else {
      instance?.getBalance();
    }
    return { assets, icpPrice };
  } catch (e) {
    console.log('getAssets', e);
  }
};

export const getNFTs = createAsyncThunk(
  'keyring/getNFTs',
  async (refresh, { getState }) => {
    try {
      const { instance } = getState().keyring;
      const response = await instance?.getState();
      const { wallets, currentWalletId } = response || {};
      let collections = wallets?.[currentWalletId]?.collections || [];
      if (!collections.length) {
        collections = await instance.getNFTs(currentWalletId, refresh);
      }
      return (collections || [])?.map(collection =>
        recursiveParseBigint(collection),
      );
    } catch (e) {
      console.log('getNFTs', e);
    }
  },
);

export const getTransactions = createAsyncThunk(
  'keyring/getTransactions',
  async (params, { getState }) => {
    return privateGetTransactions(params, getState());
  },
);

export const privateGetTransactions = async (params, state) => {
  try {
    const { icpPrice } = params;
    const response = await state.keyring.instance?.getTransactions();

    const mapTransaction = trx => {
      const asset = formatAssetBySymbol(
        trx?.details?.amount,
        trx?.details?.currency?.symbol,
        icpPrice,
      );
      const isOwnTx = [state.principalId, state.accountId].includes(
        trx?.caller,
      );
      const getType = () => {
        const { type } = trx;
        if (type.toUpperCase() === 'TRANSFER') {
          return isOwnTx ? 'SEND' : 'RECEIVE';
        }
        return type.toUpperCase();
      };
      const getSymbol = () => {
        if ('tokenRegistryInfo' in trx.details) {
          return trx.details.tokenRegistryInfo.symbol;
        }
        if ('nftRegistryInfo' in trx.details) {
          return 'NFT';
        }
        return trx?.details?.currency?.symbol ?? '';
      };
      const canisterInfo =
        trx?.details?.tokenRegistryInfo || trx?.details?.nftRegistryInfo;
      const transaction = {
        ...asset,
        type: getType(),
        hash: trx?.hash,
        to: trx?.details?.to,
        from: trx?.details?.from || trx?.caller,
        date: new Date(trx?.timestamp),
        status: ACTIVITY_STATUS[trx?.details?.status],
        image: TOKEN_IMAGES[getSymbol()] || canisterInfo?.icon || '',
        symbol: getSymbol(),
        canisterId: trx?.details?.canisterId,
        plug: null,
        canisterInfo,
        details: { ...trx?.details, caller: trx?.caller },
      };
      return transaction;
    };
    const parsedTrx = response?.transactions?.map(mapTransaction) || [];

    return parsedTrx;
  } catch (e) {
    console.log('getTransactions', e);
    return {
      error: e.message,
    };
  }
};

export const transferNFT = createAsyncThunk(
  'keyring/transferNFT',
  async (params, { getState }) => {
    try {
      const { to, nft } = params;

      const state = getState();
      const response = await state.keyring.instance?.transferNFT({
        to,
        token: nft,
      });

      return {
        response: recursiveParseBigint(response),
        nft,
        status: TRANSACTION_STATUS.success,
      };
    } catch (e) {
      console.log('transferNFT', e);
      console.trace(e.stack);
      return {
        error: e.message,
        status: TRANSACTION_STATUS.error,
      };
    }
  },
);

export const keyringSlice = createSlice({
  name: 'user',
  initialState: DEFAULT_STATE,
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    removeContact: (state, action) => {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload.id,
      );
    },
    setAssetsLoading: (state, action) => {
      state.assetsLoading = action.payload;
    },
    setAssets: (state, action) => {
      state.assets = action.payload;
    },
    setTransaction: (state, action) => {
      state.transaction = action.payload;
    },
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    setCollections: (state, action) => {
      state.collections = action.payload;
    },
    removeNFT: (state, action) => {
      const collections = state.collections.map(col => ({
        ...col,
        tokens: col.tokens.filter(token => token.id !== action.payload?.id),
      }));
      state.collections = collections.filter(col => col.tokens.length);
    },
    setTransactionsLoading: (state, action) => {
      state.transactionsLoading = action.payload;
    },
    reset: state => {
      state = DEFAULT_STATE;
    },
  },
  extraReducers: {
    [sendToken.fulfilled]: (state, action) => {
      state.transaction = action.payload;
    },
    [burnXtc.fulfilled]: (state, action) => {
      state.transaction = action.payload;
    },
    [getAssets.fulfilled]: (state, action) => {
      const formattedAssets = formatAssets(action.payload);
      state.assets =
        formattedAssets?.length > 0 ? formattedAssets : DEFAULT_ASSETS;
      state.assetsLoading = false;
    },
    [getNFTs.fulfilled]: (state, action) => {
      state.collections = action.payload;
    },
    [getTransactions.fulfilled]: (state, action) => {
      if (!action.payload.error) {
        state.transactions = action.payload;
        state.transactionsLoading = false;
      }
    },
    [transferNFT.fulfilled]: (state, action) => {
      const { nft, status, error } = action.payload;

      if (!error) {
        const collections = state.collections.map(col => ({
          ...col,
          tokens: col.tokens.filter(token => token.id !== nft.id),
        }));

        state.collections = collections.filter(col => col.tokens.length);
        state.transaction = {
          status,
        };
        state.selectedNFT = {};
      }
    },
  },
});

export const {
  setContacts,
  addContact,
  removeContact,
  setAssetsLoading,
  setAssets,
  setTransactions,
  setTransaction,
  setCollections,
  removeNFT,
  setTransactionsLoading,
  reset,
} = keyringSlice.actions;

export default keyringSlice.reducer;
