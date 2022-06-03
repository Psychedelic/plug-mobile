import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ENABLE_NFTS } from '@/constants/nfts';
import { getICPPrice } from '@/redux/slices/icp';
import { formatAssets, parseAssetsAmount } from '@/utils/assets';

import {
  DEFAULT_ASSETS,
  DEFAULT_TRANSACTION,
  filterICNSContacts,
  formatContact,
  formatContactForController,
  mapTransaction,
  recursiveParseBigint,
  TRANSACTION_STATUS,
} from '../utils';
import keyring from './keyring';

const DEFAULT_STATE = {
  assets: DEFAULT_ASSETS,
  assetsError: false,
  assetsLoading: false,
  contacts: [],
  contactsLoading: false,
  transaction: DEFAULT_TRANSACTION,
  transactions: [],
  transactionsError: false,
  transactionsLoading: false,
  collections: [],
  collectionsError: false,
  usingBiometrics: false,
  biometricsAvailable: false,
  scrollOnProfile: false,
  scrollOnNFTs: false,
};

export const sign = createAsyncThunk(
  'keyring/sign',
  async (params, { getState, dispatch }) => {
    const { msg } = params;
    const { keyring } = getState();
    const result = await keyring.instance.sign(msg);
    return { response: result };
  },
);

export const sendToken = createAsyncThunk(
  'keyring/sendToken',
  async (params, { getState, dispatch }) => {
    try {
      const { to, amount, canisterId, opts, icpPrice } = params;
      const state = getState();
      const { height, transactionId } = await state.keyring.instance?.send(
        to,
        amount,
        canisterId,
        opts
      );
      if (transactionId || height) {
        dispatch(setAssetsLoading(true));
        dispatch(setTransactionsLoading(true));
        dispatch(getAssets({ refresh: true, icpPrice }));
        dispatch(getTransactions({ icpPrice }));
      }
      return {
        response: {
          height: parseInt(height?.toString?.(), 10),
          transactionId: parseInt(transactionId?.toString?.(), 10),
        },
        status: TRANSACTION_STATUS.success,
      };
    } catch (e) {
      return {
        error: e.message,
        status: TRANSACTION_STATUS.error,
      };
    }
  }
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
      return {
        error: e.message,
        status: TRANSACTION_STATUS.error,
      };
    }
  }
);

export const setAssetsAndTransactions = createAsyncThunk(
  'keyring/setAssetsAndTransactions',
  async (params, { dispatch }) => {
    const { transactions, assets } = params;
    dispatch(setAssetsAndLoading({ assets }));
    dispatch(setTransactions(transactions || []));
    dispatch(setTransactionsLoading(false));
  }
);

export const setAssetsAndLoading = createAsyncThunk(
  'keyring/setAssetsAndTransactions',
  async (params, { dispatch }) => {
    const { assets } = params;
    const formattedAssets = formatAssets(assets);
    dispatch(
      setAssets(formattedAssets?.length > 0 ? formattedAssets : DEFAULT_ASSETS)
    );
    dispatch(setAssetsLoading(false));
  }
);

export const getAssets = createAsyncThunk(
  'keyring/getAssets',
  async (params, { getState, dispatch }) => {
    return privateGetAssets(params, getState(), dispatch);
  }
);

export const privateGetAssets = async (params, state, dispatch) => {
  try {
    dispatch(setAssetsError(false));
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
    dispatch(setAssetsError(true));
  }
};

export const getBalance = createAsyncThunk(
  'keyring/getBalance',
  async (params, { getState, dispatch }) => {
    return privateGetBalance(params, getState(), dispatch);
  },
);

export const privateGetBalance = async (params, state, dispatch) => {
  try {
    const { subaccount } = params;
    const { instance } = state.keyring;
    const icpPrice = await dispatch(getICPPrice());

    const assets = await instance?.getBalance(subaccount);
    const parsedAssets = parseAssetsAmount(assets);

    return formatAssets(parsedAssets, icpPrice);
  } catch (e) {
    dispatch(setAssetsError(true));
  }
};

export const getNFTs = createAsyncThunk(
  'keyring/getNFTs',
  async (params, { getState, dispatch }) => {
    if (ENABLE_NFTS) {
      return privateGetNFTs(params, getState(), dispatch);
    }
  }
);

export const privateGetNFTs = async (refresh, state, dispatch) => {
  try {
    dispatch(setCollectionsError(false));
    const { instance } = state.keyring;
    const response = await instance?.getState();
    const { currentWalletId } = response || {};
    let collections = [];
    collections = await instance.getNFTs(currentWalletId, refresh);
    return (collections || [])?.map(collection =>
      recursiveParseBigint(collection)
    );
  } catch (e) {
    dispatch(setCollectionsError(true));
  }
};

export const getTransactions = createAsyncThunk(
  'keyring/getTransactions',
  async (params, { getState, dispatch }) => {
    return privateGetTransactions(params, getState(), dispatch);
  }
);

export const privateGetTransactions = async (params, state, dispatch) => {
  try {
    dispatch(setTransactionsError(false));
    const { icpPrice } = params;
    const response = await state.keyring.instance?.getTransactions();
    const parsedTrx =
      response?.transactions?.map(mapTransaction(icpPrice, state)) || [];

    dispatch(setTransactionsLoading(false));
    return parsedTrx;
  } catch (e) {
    dispatch(setTransactionsError(true));
    return {
      error: e.message,
    };
  }
};

export const transferNFT = createAsyncThunk(
  'keyring/transferNFT',
  async (params, { getState, dispatch }) => {
    try {
      const { to, nft, icpPrice } = params;

      const state = getState();
      const response = await state.keyring.instance?.transferNFT({
        to,
        token: nft,
      });
      if (response) {
        await privateGetNFTs(true, state, dispatch);
        dispatch(setTransactionsLoading(true));
        dispatch(getTransactions({ icpPrice }));
      }

      return {
        response: recursiveParseBigint(response),
        nft,
        status: TRANSACTION_STATUS.success,
      };
    } catch (e) {
      console.trace(e.stack);
      return {
        error: e.message,
        status: TRANSACTION_STATUS.error,
      };
    }
  }
);

export const getContacts = createAsyncThunk(
  'keyring/getContacts',
  async (walletNumber = 0, { getState }) => {
    try {
      const state = getState();
      const res = await state.keyring.instance?.getContacts(walletNumber);
      // TODO: When ICNS is integrated in PlugMobile delete the .filter(filterICNSContacts)
      return res?.map(formatContact).filter(filterICNSContacts);
    } catch (e) {
      console.log('Error getting contacts:', e);
    }
  }
);

export const addContact = createAsyncThunk(
  'keyring/addContact',
  async ({ contact, walletNumber = 0, onFinish }, { getState, dispatch }) => {
    try {
      dispatch(setContactsLoading(true));
      const state = getState();
      const res = await state.keyring.instance?.addContact(
        formatContactForController(contact),
        walletNumber
      );
      if (res) {
        dispatch(setContacts([...state.user.contacts, contact]));
        dispatch(setContactsLoading(false));
        onFinish?.();
        // We get the contacts again to update the contact list from dab
        dispatch(getContacts());
      }
    } catch (e) {
      // TODO: We should handle this error
      dispatch(setContactsLoading(false));
      console.log('Error adding contacts:', e);
    }
  }
);

export const removeContact = createAsyncThunk(
  'keyring/removeContact',
  async ({ contactName, walletNumber = 0 }, { getState, dispatch }) => {
    try {
      dispatch(setContactsLoading(true));
      const state = getState();
      const res = await state.keyring.instance?.deleteContact(
        contactName,
        walletNumber
      );
      if (res) {
        dispatch(
          setContacts(state.user.contacts.filter(c => c.name !== contactName))
        );
        dispatch(setContactsLoading(false));
        // We get the contacts again to update the contact list from dab
        dispatch(getContacts());
      }
    } catch (e) {
      // TODO: We should handle this error
      dispatch(setContactsLoading(false));
      console.log('Error removing contact:', e);
    }
  }
);

export const editContact = createAsyncThunk(
  'keyring/editContact',
  async ({ contact, newContact, walletNumber = 0 }, { getState, dispatch }) => {
    try {
      dispatch(setContactsLoading(true));
      const state = getState();
      const removeContactRes = await state.keyring.instance?.deleteContact(
        contact.name,
        walletNumber
      );
      const addContactRes = await state.keyring.instance?.addContact(
        formatContactForController(newContact),
        walletNumber
      );
      if (removeContactRes && addContactRes) {
        dispatch(
          setContacts([
            ...state.user.contacts.filter(c => c.id !== contact.id),
            newContact,
          ])
        );
        dispatch(setContactsLoading(false));
        // We get the contacts again to update the contact list from dab
        dispatch(getContacts());
      } else {
        // TODO: We should handle this error
        dispatch(setContactsLoading(false));
        console.log('Error editing contact:');
      }
    } catch (e) {
      // TODO: We should handle this error
      dispatch(setContactsLoading(false));
      console.log('Error editing contact:', e);
    }
  }
);
export const getICNSData = createAsyncThunk(
  'keyring/getICNSData',
  async ({ refresh }, { getState, dispatch }) => {
    const { currentWallet } = getState().keyring;
    const icnsData = currentWallet?.icnsData || { names: [] };
    if (!icnsData?.names?.length || refresh) {
      return keyring.getICNSData();
    } else {
      keyring.getICNSData();
    }
    return icnsData;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState: DEFAULT_STATE,
  reducers: {
    setUsingBiometrics: (state, action) => {
      state.usingBiometrics = action.payload;
    },
    setContactsLoading: (state, action) => {
      state.contactsLoading = action.payload;
    },
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    setBiometricsAvailable: (state, action) => {
      state.biometricsAvailable = action.payload;
    },
    setAssetsLoading: (state, action) => {
      state.assetsLoading = action.payload;
    },
    setAssets: (state, action) => {
      state.assets = action.payload;
    },
    setScrollOnProfile: (state, action) => {
      state.scrollOnProfile = action.payload;
    },
    setScrollOnNFTs: (state, action) => {
      state.scrollOnNFTs = action.payload;
    },
    setAssetsError: (state, action) => {
      state.assetsError = action.payload;
    },
    setTransaction: (state, action) => {
      state.transaction = action.payload;
    },
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    setTransactionsError: (state, action) => {
      state.transactionsError = action.payload;
    },
    setCollections: (state, action) => {
      state.collections = action.payload;
    },
    setCollectionsError: (state, action) => {
      state.collectionsError = action.payload;
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
    resetUserState: state => {
      state = DEFAULT_STATE;
    },
  },
  extraReducers: {
    [getContacts.fulfilled]: (state, action) => {
      state.contacts = action.payload;
    },
    [sendToken.fulfilled]: (state, action) => {
      state.transaction = action.payload;
    },
    [burnXtc.fulfilled]: (state, action) => {
      state.transaction = action.payload;
    },
    [getAssets.fulfilled]: (state, action) => {
      const formattedAssets = formatAssets(action.payload || []);
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
        state.selectedNFT = {};
      }
      state.transaction = {
        status,
      };
    },
  },
});

export const {
  setScrollOnNFTs,
  setScrollOnProfile,
  setTransactionsError,
  setCollectionsError,
  setAssetsError,
  setUsingBiometrics,
  setBiometricsAvailable,
  setAssetsLoading,
  setAssets,
  setTransactions,
  setTransaction,
  setContacts,
  setContactsLoading,
  setCollections,
  removeNFT,
  setTransactionsLoading,
  resetUserState,
} = userSlice.actions;

export default userSlice.reducer;
