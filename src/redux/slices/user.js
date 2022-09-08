import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { JELLY_CANISTER_ID } from '@/constants/canister';
import { ENABLE_NFTS } from '@/constants/nfts';
import { getICPPrice } from '@/redux/slices/icp';
import { formatAssets, parseToBigIntString } from '@/utils/currencies';
import { recursiveParseBigint } from '@/utils/objects';

import {
  DEFAULT_ASSETS,
  DEFAULT_TRANSACTION,
  filterICNSContacts,
  formatContact,
  formatContactForController,
  formatTransaction,
  TRANSACTION_STATUS,
} from '../utils';
import { setCurrentWallet, setWallets } from './keyring';

const DEFAULT_STATE = {
  assets: DEFAULT_ASSETS,
  assetsError: null,
  assetsLoading: false,
  contacts: [],
  contactsLoading: false,
  contactsError: null,
  transaction: DEFAULT_TRANSACTION,
  transactions: [],
  transactionsError: null,
  transactionsLoading: false,
  collections: [],
  collectionsError: null,
  collectionsLoading: false,
  usingBiometrics: false,
  biometricsAvailable: false,
};

export const sign = createAsyncThunk(
  'keyring/sign',
  async (params, { getState }) => {
    const { msg } = params;
    const { keyring } = getState();
    const result = await keyring.instance.sign(msg);
    return { response: result };
  }
);

export const sendToken = createAsyncThunk(
  'keyring/sendToken',
  async (params, { getState, dispatch }) => {
    try {
      const { to, amount, canisterId, opts, icpPrice } = params;
      const { keyring } = getState();
      const { assets } = keyring.currentWallet;
      const standard = assets[canisterId].token.standard;
      const { token } = await keyring?.instance?.getTokenInfo({
        canisterId,
        standard,
      });
      const { decimals } = token;
      const parsedAmount = parseToBigIntString(amount, parseInt(decimals, 10));
      const { height, transactionId } = await keyring.instance?.send({
        to,
        amount: parsedAmount,
        canisterId,
        opts,
      });
      if (transactionId || height) {
        dispatch(getBalance());
        dispatch(getTransactions({ icpPrice }));
      }
      return {
        response: {
          height: height ? parseInt(height, 10) : undefined,
          transactionId: transactionId
            ? parseInt(transactionId, 10)
            : undefined,
        },
        status: TRANSACTION_STATUS.success,
      };
    } catch (e) {
      console.log('e', e);
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
      const { keyring } = getState();
      const response = await keyring.instance?.burnXTC(params);
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

export const getBalance = createAsyncThunk(
  'keyring/getBalance',
  async (params, { getState, dispatch, rejectWithValue }) => {
    try {
      const { refresh = true, subaccount } = params || {};
      const { instance } = getState().keyring;
      const response = await instance?.getState();
      const { wallets, currentWalletId } = response || {};
      let assets = Object.values(wallets?.[currentWalletId]?.assets);

      const shouldUpdate =
        Object.values(assets)?.every(asset => !Number(asset.amount)) ||
        Object.values(assets)?.some(asset => Number.isNaN(asset.amount)) ||
        refresh;

      if (shouldUpdate) {
        assets = await instance?.getBalances(subaccount);
      } else {
        instance?.getBalances(subaccount);
      }

      const icpPrice = await dispatch(getICPPrice()).unwrap();
      return formatAssets(assets, icpPrice);
    } catch (e) {
      console.log('getBalance error', e);
      return rejectWithValue({ error: e.message });
    }
  }
);

export const getNFTs = createAsyncThunk(
  'keyring/getNFTs',
  async (params, { getState, rejectWithValue }) => {
    if (ENABLE_NFTS) {
      try {
        const { instance } = getState().keyring;
        const response = await instance?.getState();
        const { currentWalletId } = response || {};
        let collections = [];
        collections = await instance.getNFTs(currentWalletId, params?.refresh);
        return (collections || [])?.map(collection =>
          recursiveParseBigint(collection)
        );
      } catch (e) {
        return rejectWithValue({ error: e.message });
      }
    }
  }
);

export const getTransactions = createAsyncThunk(
  'keyring/getTransactions',
  async (params, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { icpPrice } = params;
      const currentWalletId = state.keyring?.instance?.currentWalletId;
      const currentWallet =
        state.keyring?.instance?.state?.wallets[currentWalletId];
      const response = await state.keyring.instance?.getTransactions();
      let parsedTrx =
        response?.transactions?.map(
          formatTransaction(icpPrice, currentWallet)
        ) || [];

      if (!ENABLE_NFTS) {
        parsedTrx = parsedTrx.filter(
          item =>
            !(
              item?.symbol === 'NFT' ||
              item?.details.canisterId === JELLY_CANISTER_ID
            )
        );
      }

      return parsedTrx;
    } catch (e) {
      return rejectWithValue({
        error: e.message,
      });
    }
  }
);

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
        dispatch(getTransactions({ icpPrice }));
      }

      return {
        collections: recursiveParseBigint(response),
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
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const res = await state.keyring.instance?.getContacts();
      // TODO: When ICNS is integrated in PlugMobile delete the .filter(filterICNSContacts)
      return res?.map(formatContact).filter(filterICNSContacts);
    } catch (e) {
      console.log('Error getting contacts:', e);
      rejectWithValue({ error: e.message });
    }
  }
);

export const addContact = createAsyncThunk(
  'keyring/addContact',
  async ({ contact, onFinish }, { getState, dispatch, rejectWithValue }) => {
    try {
      const state = getState();
      const res = await state.keyring.instance?.addContact({
        contact: formatContactForController(contact),
      });
      if (res) {
        dispatch(setContacts([...state.user.contacts, contact]));
        onFinish?.();
      }
    } catch (e) {
      // TODO: handle this error
      console.log('Error adding contacts:', e);
      rejectWithValue({ error: e.message });
    }
  }
);

export const removeContact = createAsyncThunk(
  'keyring/removeContact',
  async ({ contactName }, { getState, dispatch, rejectWithValue }) => {
    try {
      const state = getState();
      const res = await state.keyring.instance?.deleteContact({
        addressName: contactName,
      });
      if (res) {
        dispatch(
          setContacts(state.user.contacts.filter(c => c.name !== contactName))
        );
      }
    } catch (e) {
      // TODO: handle this error
      console.log('Error removing contact:', e);
      rejectWithValue({ error: e.message });
    }
  }
);

export const editContact = createAsyncThunk(
  'keyring/editContact',
  async (
    { contact, newContact, walletNumber = 0 },
    { getState, dispatch, rejectWithValue }
  ) => {
    try {
      const state = getState();
      const removeContactRes = await state.keyring.instance?.deleteContact({
        addressName: contact.name,
        subaccount: walletNumber,
      });

      const addContactRes = await state.keyring.instance?.addContact({
        contact: formatContactForController(newContact),
        subaccount: walletNumber,
      });

      if (removeContactRes && addContactRes) {
        dispatch(
          setContacts([
            ...state.user.contacts.filter(c => c.id !== contact.id),
            newContact,
          ])
        );
      } else {
        // TODO: handle this error
        rejectWithValue({ error: 'Error editing contact' });
      }
    } catch (e) {
      // TODO: handle this error
      rejectWithValue({ error: e.message });
    }
  }
);

export const getICNSData = createAsyncThunk(
  'keyring/getICNSData',
  async ({ refresh }, { getState, dispatch }) => {
    const { keyring } = getState();
    const { currentWallet } = keyring;
    const icnsData = currentWallet?.icnsData || { names: [] };
    if (!icnsData?.names?.length || refresh) {
      return keyring.getICNSData();
    } else {
      keyring.getICNSData();
    }
    return icnsData;
  }
);

export const addCustomToken = createAsyncThunk(
  'keyring/addCustomToken',
  /**
   * @param {{token: DABToken, onSuccess: () => void}} param
   */
  async ({ token, onSuccess }, { getState, dispatch }) => {
    const { keyring, icp } = getState();
    const currentWalletId = keyring?.instance?.currentWalletId;
    const { canisterId, standard, logo } = token;
    try {
      const tokenList = await keyring?.instance?.registerToken({
        canisterId,
        standard,
        subaccount: currentWalletId,
        logo,
      });
      dispatch(setBalance(formatAssets(tokenList, icp.icpPrice)));

      const { wallets } = await keyring?.instance?.getState();
      dispatch(setWallets(wallets));
      dispatch(setCurrentWallet(wallets[currentWalletId]));
      onSuccess?.();
    } catch (error) {
      // TODO handle error
      console.log(error);
    }
  }
);

export const removeCustomToken = createAsyncThunk(
  'keyring/removeCustomToken',
  /**
   * @param { canisterId: string } param
   */
  async (canisterId, { getState, rejectWithValue }) => {
    const { keyring, icp } = getState();
    try {
      const tokenList = await keyring?.instance?.removeToken({ canisterId });
      return formatAssets(tokenList, icp.icpPrice);
    } catch (e) {
      return rejectWithValue({ error: e.message });
    }
  }
);

export const getTokenInfo = createAsyncThunk(
  'keyring/getTokenInfo',
  /**
   * @param {{token: DABToken, onSuccess: (token: DABToken) => void, onError: (err: string) => void}} param
   */
  async ({ token, onSuccess, onError }, { getState }) => {
    const { keyring } = getState();
    const currentWalletId = keyring?.instance?.currentWalletId;
    try {
      const tokenInfo = await keyring?.instance?.getTokenInfo({
        subaccount: currentWalletId,
        canisterId: token.canisterId,
        standard: token.standard,
      });
      onSuccess?.({ ...tokenInfo, amount: tokenInfo.amount.toString() });
    } catch (error) {
      // TODO handle error
      console.log('Error while fetching token info', error);
      onError?.(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: DEFAULT_STATE,
  reducers: {
    setUsingBiometrics: (state, action) => {
      state.usingBiometrics = action.payload;
    },
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    setBiometricsAvailable: (state, action) => {
      state.biometricsAvailable = action.payload;
    },
    setBalance: (state, action) => {
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
    reset: () => {
      return DEFAULT_STATE;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
      })
      .addCase(sendToken.fulfilled, (state, action) => {
        state.transaction = action.payload;
      })
      .addCase(burnXtc.fulfilled, (state, action) => {
        state.transaction = action.payload;
      })
      .addCase(getBalance.pending, state => {
        state.assetsError = null;
        state.assetsLoading = true;
      })
      .addCase(getBalance.fulfilled, (state, action) => {
        const assets = action.payload;
        state.assets = assets?.length > 0 ? assets : DEFAULT_ASSETS;
        state.assetsLoading = false;
      })
      .addCase(getBalance.rejected, (state, action) => {
        state.assetsError = action.payload.error;
        state.assetsLoading = false;
      })
      .addCase(getNFTs.pending, state => {
        state.collectionsError = null;
        state.collectionsLoading = true;
      })
      .addCase(getNFTs.fulfilled, (state, action) => {
        // TODO: remove this when ICNS is fully implemented
        const filteredNFTS =
          action.payload?.filter(nft => nft.name !== 'ICNS') || [];
        state.collections = filteredNFTS;
        state.collectionsLoading = false;
      })
      .addCase(getNFTs.rejected, (state, action) => {
        state.collectionsError = action.payload.error;
        state.collectionsLoading = false;
      })
      .addCase(getTransactions.pending, state => {
        state.transactionsError = null;
        state.transactionsLoading = true;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.transactionsLoading = false;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.transactionsError = action.payload.error;
        state.transactionsLoading = false;
      })
      .addCase(transferNFT.fulfilled, (state, action) => {
        const { collections, status, error } = action.payload;
        if (!error) {
          state.collections = collections;
          state.selectedNFT = {};
        }
        state.transaction = {
          status,
        };
      })
      .addCase(removeCustomToken.fulfilled, (state, action) => {
        state.assets = action.payload;
      })
      .addMatcher(
        isAnyOf(
          getContacts.pending,
          addContact.pending,
          removeContact.pending,
          editContact.pending
        ),
        state => {
          state.contactsError = null;
          state.contactsLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getContacts.fulfilled,
          addContact.fulfilled,
          removeContact.fulfilled,
          editContact.fulfilled
        ),
        state => {
          state.contactsLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          getContacts.rejected,
          addContact.rejected,
          removeContact.rejected,
          editContact.rejected
        ),
        (state, action) => {
          state.contactsLoading = false;
          state.contactsError = action.payload.error;
        }
      );
  },
});

export const {
  setUsingBiometrics,
  setBiometricsAvailable,
  setBalance,
  setTransactions,
  setTransaction,
  setContacts,
  setCollections,
  reset,
} = userSlice.actions;

export default userSlice.reducer;
