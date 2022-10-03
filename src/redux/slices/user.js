import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { JELLY_CANISTER_ID } from '@/constants/canister';
import { ENABLE_NFTS } from '@/constants/nfts';
import KeyRing from '@/modules/keyring';
import { getICPPrice } from '@/redux/slices/icp';
import {
  formatAsset,
  formatAssets,
  parseToBigIntString,
} from '@/utils/currencies';
import { recursiveParseBigint } from '@/utils/objects';
import { uniqueConcat } from '@/utils/utilities';

import {
  DEFAULT_ASSETS,
  DEFAULT_TRANSACTION,
  formatContact,
  formatContactForController,
  formatTransaction,
  TRANSACTION_STATUS,
} from '../utils';

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
  connectedApps: [],
};

export const sign = createAsyncThunk('user/sign', async params => {
  const { msg } = params;
  const instance = KeyRing.getInstance();
  const result = await instance.sign(msg);
  return { response: result };
});

export const sendToken = createAsyncThunk(
  'user/sendToken',
  async (params, { rejectWithValue, getState, dispatch }) => {
    try {
      const { to, amount, canisterId, opts, icpPrice } = params;
      const { user } = getState();
      const instance = KeyRing.getInstance();
      const token = user.assets.find(asset => asset.canisterId === canisterId);
      const parsedAmount = parseToBigIntString(
        amount,
        parseInt(token.decimals, 10)
      );
      const { height, transactionId } = await instance?.send({
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
      return rejectWithValue({
        error: e.message,
        status: TRANSACTION_STATUS.error,
      });
    }
  }
);

export const burnXtc = createAsyncThunk(
  'user/burnXtc',
  async (params, { getState }) => {
    try {
      const instance = KeyRing.getInstance();
      const response = await instance?.burnXTC(params);
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
  'user/getBalance',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const { subaccount } = params || {};
      const instance = KeyRing.getInstance();
      const response = await instance?.getState();
      const { currentWalletId } = response || {};

      const selectedSubaccount = {
        subaccount: subaccount || currentWalletId,
      };

      const assets = await instance?.getBalances(selectedSubaccount);

      const icpPrice = await dispatch(getICPPrice()).unwrap();
      return formatAssets(assets, icpPrice);
    } catch (e) {
      console.log('getBalance error', e);
      return rejectWithValue({ error: e.message });
    }
  }
);

export const getNFTs = createAsyncThunk(
  'user/getNFTs',
  async (params, { rejectWithValue }) => {
    if (ENABLE_NFTS) {
      try {
        const instance = KeyRing.getInstance();
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
  'user/getTransactions',
  async (params, { rejectWithValue }) => {
    try {
      const { icpPrice } = params;
      const instance = KeyRing.getInstance();
      const currentWalletId = instance?.currentWalletId;
      const currentWallet = instance?.state?.wallets[currentWalletId];
      const response = await instance?.getTransactions();
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
  'user/transferNFT',
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const { to, nft, icpPrice, onEnd } = params;
      const instance = KeyRing.getInstance();
      const response = await instance?.transferNFT({
        to,
        token: nft,
      });
      if (response) {
        dispatch(getTransactions({ icpPrice }));
      }
      onEnd?.();
      return {
        nft,
        status: TRANSACTION_STATUS.success,
      };
    } catch (e) {
      console.trace(e.stack);
      params?.onEnd?.();
      return rejectWithValue({
        error: e.message,
        status: TRANSACTION_STATUS.error,
      });
    }
  }
);

export const getContacts = createAsyncThunk(
  'user/getContacts',
  async (_, { rejectWithValue }) => {
    try {
      const instance = KeyRing.getInstance();
      const res = await instance?.getContacts();
      return res?.map(formatContact);
    } catch (e) {
      console.log('Error getting contacts:', e);
      return rejectWithValue({ error: e.message });
    }
  }
);

export const addContact = createAsyncThunk(
  'user/addContact',
  async ({ contact, onFinish }, { getState, dispatch, rejectWithValue }) => {
    try {
      const state = getState();
      const instance = KeyRing.getInstance();
      const res = await instance?.addContact({
        contact: formatContactForController(contact),
      });
      if (res) {
        dispatch(setContacts([...state.user.contacts, contact]));
        onFinish?.();
      }
    } catch (e) {
      // TODO: handle this error
      console.log('Error adding contacts:', e);
      return rejectWithValue({ error: e.message });
    }
  }
);

export const removeContact = createAsyncThunk(
  'user/removeContact',
  async ({ contactName }, { getState, dispatch, rejectWithValue }) => {
    try {
      const state = getState();
      const instance = KeyRing.getInstance();
      const res = await instance?.deleteContact({
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
      return rejectWithValue({ error: e.message });
    }
  }
);

export const editContact = createAsyncThunk(
  'user/editContact',
  async ({ contact, newContact }, { getState, dispatch, rejectWithValue }) => {
    try {
      const state = getState();
      const instance = KeyRing.getInstance();
      const removeContactRes = await instance?.deleteContact({
        addressName: contact.name,
      });

      const addContactRes = await instance?.addContact({
        contact: formatContactForController(newContact),
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
        return rejectWithValue({ error: 'Error editing contact' });
      }
    } catch (e) {
      // TODO: handle this error
      return rejectWithValue({ error: e.message });
    }
  }
);

export const addCustomToken = createAsyncThunk(
  'user/addCustomToken',
  /**
   * @param {{token: DABToken, onSuccess: () => void}} param
   */
  async ({ token, onSuccess }, { getState, dispatch }) => {
    const { icp, user } = getState();
    const instance = KeyRing.getInstance();
    const currentWalletId = instance?.currentWalletId;
    const { canisterId, standard, logo } = token;
    try {
      const registeredToken = await instance?.registerToken({
        canisterId,
        standard,
        subaccount: currentWalletId,
        logo,
      });
      const assets = [
        ...user.assets,
        formatAsset(registeredToken, icp.icpPrice),
      ];

      onSuccess?.();
      return assets;
    } catch (error) {
      // TODO handle error
      console.log(error);
    }
  }
);

export const removeCustomToken = createAsyncThunk(
  'user/removeCustomToken',
  /**
   * @param { canisterId: string } param
   */
  async (canisterId, { getState, rejectWithValue }) => {
    const { user } = getState();
    const instance = KeyRing.getInstance();
    try {
      await instance?.removeToken({ canisterId });
      const newAssets = user.assets.filter(
        token => token.canisterId !== canisterId
      );
      return newAssets;
    } catch (e) {
      return rejectWithValue({ error: e.message });
    }
  }
);

export const getTokenInfo = createAsyncThunk(
  'user/getTokenInfo',
  /**
   * @param {{token: DABToken, onSuccess: (token: DABToken) => void, onError: (err: string) => void}} param
   */
  async ({ token, onSuccess, onError }, { getState }) => {
    const instance = KeyRing.getInstance();
    const currentWalletId = instance?.currentWalletId;
    try {
      const tokenInfo = await instance?.getTokenInfo({
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

export const addConnectedApp = createAsyncThunk(
  'user/addConnectedApp',
  /**  @param {any} [app] */
  async (app, { getState }) => {
    const currentConnectedApps = getState().user.connectedApps;
    const { name, canisterList, lastConection, account } = app;

    const appAlreadyAdded = currentConnectedApps.find(
      connectedApp =>
        connectedApp.name === name && connectedApp.account === account
    );

    if (appAlreadyAdded) {
      return currentConnectedApps.map(connectedApp =>
        connectedApp.name === name
          ? {
              lastConection,
              canisterList: uniqueConcat(
                connectedApp.canisterList,
                canisterList
              ),
              ...connectedApp,
            }
          : connectedApp
      );
    }

    return [app, ...currentConnectedApps];
  }
);

export const removeConnectedApp = createAsyncThunk(
  'user/removeConnectedApp',
  /**  @param {any} [app] */
  async (app, { getState }) => {
    const { name, account } = app;
    const currentConnectedApps = getState().user.connectedApps;

    return currentConnectedApps.filter(
      connectedApp =>
        connectedApp.name !== name && connectedApp.account === account
    );
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
        state.collections = action.payload;
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
        const { nft, status } = action.payload;
        const collections = state.collections
          .map(col =>
            col.canisterId === nft.canister
              ? {
                  ...col,
                  tokens: col.tokens.filter(tok => tok.index !== nft.index),
                }
              : col
          )
          .filter(col => col.tokens.length);

        state.collections = collections;
        state.selectedNFT = {};
        state.transaction = { status };
      })
      .addCase(transferNFT.rejected, (state, action) => {
        state.transaction = action.payload;
      })
      .addMatcher(
        isAnyOf(sendToken.fulfilled, sendToken.rejected),
        (state, action) => {
          state.transaction = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(addCustomToken.fulfilled, removeCustomToken.fulfilled),
        (state, action) => {
          state.assets = action.payload;
        }
      )
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
      )
      .addMatcher(
        isAnyOf(removeConnectedApp.fulfilled, addConnectedApp.fulfilled),
        (state, action) => {
          state.connectedApps = action.payload;
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
