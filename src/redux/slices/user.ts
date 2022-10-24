import { Principal } from '@dfinity/principal';
import { Address } from '@psychedelic/plug-controller/dist/interfaces/contact_registry';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { JELLY_CANISTER_ID } from '@/constants/canister';
import { ENABLE_NFTS } from '@/constants/nfts';
import { FungibleStandard, TokenBalance } from '@/interfaces/keyring';
import {
  Asset,
  Collection,
  CollectionToken,
  Contact,
  State,
  Transaction,
  UserState,
} from '@/interfaces/redux';
import { WCWhiteListItem } from '@/interfaces/walletConnect';
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

const INITIAL_STATE: UserState = {
  assets: DEFAULT_ASSETS,
  assetsError: undefined,
  assetsLoading: false,
  contacts: [],
  contactsLoading: false,
  contactsError: undefined,
  transaction: DEFAULT_TRANSACTION,
  transactions: [],
  transactionsError: undefined,
  transactionsLoading: false,
  collections: [],
  collectionsError: undefined,
  collectionsLoading: false,
  usingBiometrics: false,
  biometricsAvailable: false,
  connectedApps: [],
};

export const sendToken = createAsyncThunk(
  'user/sendToken',
  async (
    params: {
      to: string;
      amount: number;
      canisterId: string;
      opts: any;
      icpPrice: number;
    },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const { to, amount, canisterId, opts, icpPrice } = params;
      const { user } = getState() as State;
      const instance = KeyRing.getInstance();
      const token = user.assets.find(asset => asset.canisterId === canisterId);
      const parsedAmount = parseToBigIntString(amount, token!.decimals);
      const response = await instance?.send({
        to,
        amount: parsedAmount,
        canisterId,
        opts,
      });
      if ('transactionId' in response || 'height' in response) {
        dispatch(getBalance({}));
        dispatch(getTransactions({ icpPrice }));
      }
      return {
        status: TRANSACTION_STATUS.success,
      };
    } catch (e: any) {
      console.log('e', e);
      return rejectWithValue({
        status: TRANSACTION_STATUS.error,
      });
    }
  }
);

export const burnXtc = createAsyncThunk(
  'user/burnXtc',
  async (
    params: { to: string; amount: string; subaccount: string },
    { rejectWithValue }
  ) => {
    try {
      const instance = KeyRing.getInstance();
      const response = await instance?.burnXTC(params);
      if ('Ok' in response) {
        return {
          status: TRANSACTION_STATUS.success,
        };
      } else {
        return rejectWithValue({ status: TRANSACTION_STATUS.error });
      }
    } catch (e: any) {
      return rejectWithValue({
        status: TRANSACTION_STATUS.error,
      });
    }
  }
);

export const getBalance = createAsyncThunk<
  Asset[],
  { subaccount?: string } | undefined,
  { rejectValue: string }
>('user/getBalance', async (params, { dispatch, rejectWithValue }) => {
  try {
    const { subaccount } = params || {};
    const instance = KeyRing.getInstance();

    const assets = await instance?.getBalances({ subaccount });
    const icpPrice = await dispatch(getICPPrice()).unwrap();
    return formatAssets(assets, icpPrice);
  } catch (e: any) {
    console.log('getBalance error', e);
    return rejectWithValue(e.message);
  }
});

export const getNFTs = createAsyncThunk<
  Collection[],
  { refresh: boolean } | undefined,
  { rejectValue: string }
>('user/getNFTs', async (params, { rejectWithValue }) => {
  if (ENABLE_NFTS) {
    try {
      const instance = KeyRing.getInstance();
      const collections = await instance.getNFTs({
        refresh: params?.refresh,
      });
      return (collections || []).map(collection =>
        recursiveParseBigint(collection)
      );
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
  return [];
});

export const getTransactions = createAsyncThunk<
  Transaction[],
  { icpPrice: number },
  { rejectValue: string }
>('user/getTransactions', async (params, { rejectWithValue }) => {
  try {
    const { icpPrice } = params;
    const instance = KeyRing.getInstance();
    const currentWalletId = instance?.currentWalletId;
    const state = await instance?.getState();
    const currentWallet = state.wallets[currentWalletId];
    const response = await instance?.getTransactions({});
    let parsedTrx =
      response?.transactions?.map(formatTransaction(icpPrice, currentWallet)) ||
      [];

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
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const transferNFT = createAsyncThunk(
  'user/transferNFT',
  async (
    params: {
      to: string;
      nft: CollectionToken;
      icpPrice: number;
      onEnd?: () => void;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { to, nft, icpPrice, onEnd } = params;
      const instance = KeyRing.getInstance();
      const response = await instance?.transferNFT({
        to,
        // @ts-ignore
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
    } catch (e: any) {
      console.trace(e.stack);
      params?.onEnd?.();
      return rejectWithValue({
        error: e.message,
        status: TRANSACTION_STATUS.error,
      });
    }
  }
);

export const getContacts = createAsyncThunk<
  Contact[],
  undefined,
  { rejectValue: string }
>('user/getContacts', async (_, { rejectWithValue }) => {
  try {
    const instance = KeyRing.getInstance();
    const res = await instance?.getContacts({});
    return res?.map(formatContact);
  } catch (e: any) {
    console.log('Error getting contacts:', e);
    return rejectWithValue(e.message);
  }
});

export const addContact = createAsyncThunk<
  Contact[],
  { contact: Contact; onFinish?: () => void },
  { rejectValue: string; state: State }
>(
  'user/addContact',
  async ({ contact, onFinish }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const instance = KeyRing.getInstance();
      const res = await instance?.addContact({
        contact: formatContactForController(contact) as Address,
      });
      if (res) {
        onFinish?.();
        return [...state.user.contacts, contact];
      }
      return rejectWithValue('Error adding contact');
    } catch (e: any) {
      // TODO: handle this error
      console.log('Error adding contacts:', e);
      return rejectWithValue(e.message);
    }
  }
);

export const removeContact = createAsyncThunk<
  Contact[],
  { contactName: string },
  { rejectValue: string; state: State }
>(
  'user/removeContact',
  async ({ contactName }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const instance = KeyRing.getInstance();
      const res = await instance?.deleteContact({
        addressName: contactName,
      });
      if (res) {
        return state.user.contacts.filter(c => c.name !== contactName);
      }
      return rejectWithValue('Error removing contact');
    } catch (e: any) {
      // TODO: handle this error
      console.log('Error removing contact:', e);
      return rejectWithValue(e.message);
    }
  }
);

export const editContact = createAsyncThunk<
  Contact[],
  { contact: Contact; newContact: Contact },
  { rejectValue: string; state: State }
>(
  'user/editContact',
  async ({ contact, newContact }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const instance = KeyRing.getInstance();
      const removeContactRes = await instance?.deleteContact({
        addressName: contact.name,
      });

      const addContactRes = await instance?.addContact({
        contact: formatContactForController(newContact) as Address,
      });

      if (removeContactRes && addContactRes) {
        return [
          ...state.user.contacts.filter(c => c.id !== contact.id),
          newContact,
        ];
      } else {
        // TODO: handle this error
        return rejectWithValue('Error editing contact');
      }
    } catch (e: any) {
      // TODO: handle this error
      return rejectWithValue(e.message);
    }
  }
);

export const addCustomToken = createAsyncThunk<
  Asset[],
  {
    token: { canisterId: Principal | string; standard: string; logo?: string };
    onSuccess: () => void;
    onError: (e: string) => void;
  },
  { rejectValue: string; state: State }
>(
  'user/addCustomToken',
  async ({ token, onSuccess, onError }, { getState, rejectWithValue }) => {
    const { icp, user } = getState();
    const instance = KeyRing.getInstance();
    const currentWalletId = instance?.currentWalletId;
    const { canisterId, standard, logo } = token;
    try {
      const isAlreadyAdded = !!user.assets.find(
        asset => asset.canisterId === canisterId.toString()
      );
      if (isAlreadyAdded) {
        onSuccess?.();
        return user.assets;
      }

      const registeredToken = await instance?.registerToken({
        canisterId: canisterId.toString(),
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
    } catch (e: any) {
      onError?.(e.message);
      return rejectWithValue(e.message);
    }
  }
);

export const removeCustomToken = createAsyncThunk(
  'user/removeCustomToken',
  async (canisterId: string, { getState, rejectWithValue }) => {
    const { user } = getState() as State;
    const instance = KeyRing.getInstance();
    try {
      await instance?.removeToken({ canisterId });
      const newAssets = user.assets.filter(
        token => token.canisterId !== canisterId
      );
      return newAssets;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const getTokenInfo = createAsyncThunk(
  'user/getTokenInfo',
  async (
    {
      token,
      onSuccess,
      onError,
    }: {
      token: { canisterId: string; standard: FungibleStandard };
      onSuccess: (token: TokenBalance) => void;
      onError: (err: string) => void;
    },
    { rejectWithValue }
  ) => {
    const instance = KeyRing.getInstance();
    const currentWalletId = instance?.currentWalletId;
    try {
      const tokenInfo = await instance?.getTokenInfo({
        subaccount: currentWalletId,
        canisterId: token.canisterId,
        standard: token.standard,
      });
      onSuccess?.({ ...tokenInfo, amount: tokenInfo.amount.toString() });
    } catch (e: any) {
      console.log('Error while fetching token info', e);
      onError?.(e.message);
      return rejectWithValue(e.message);
    }
  }
);

export const addConnectedApp = createAsyncThunk(
  'user/addConnectedApp',
  async (
    app: {
      name: string;
      canisterList: WCWhiteListItem[];
      lastConnection: Date;
      account: string;
      imageUri: string;
    },
    { getState }
  ) => {
    const state = getState() as State;
    const currentConnectedApps = state.user.connectedApps;
    const { name, canisterList, lastConnection, account } = app;

    const appAlreadyAdded = currentConnectedApps.find(
      connectedApp =>
        connectedApp.name === name && connectedApp.account === account
    );

    if (appAlreadyAdded) {
      return currentConnectedApps.map(connectedApp =>
        connectedApp.name === name
          ? {
              ...connectedApp,
              canisterList: uniqueConcat(
                connectedApp.canisterList,
                canisterList
              ),
              lastConnection,
            }
          : connectedApp
      );
    }

    return [app, ...currentConnectedApps];
  }
);

export const removeConnectedApp = createAsyncThunk(
  'user/removeConnectedApp',
  async (app: { name: string; account: string }, { getState }) => {
    const { name, account } = app;
    const state = getState() as State;
    const currentConnectedApps = state.user.connectedApps;

    return currentConnectedApps.filter(
      connectedApp =>
        connectedApp.name !== name && connectedApp.account === account
    );
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
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
      return INITIAL_STATE;
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
        state.assetsError = undefined;
        state.assetsLoading = true;
      })
      .addCase(getBalance.fulfilled, (state, action) => {
        const assets = action.payload;
        state.assets = assets?.length > 0 ? assets : DEFAULT_ASSETS;
        state.assetsLoading = false;
      })
      .addCase(getBalance.rejected, (state, action) => {
        state.assetsError = action.payload;
        state.assetsLoading = false;
      })
      .addCase(getNFTs.pending, state => {
        state.collectionsError = undefined;
        state.collectionsLoading = true;
      })
      .addCase(getNFTs.fulfilled, (state, action) => {
        state.collections = action.payload ?? [];
        state.collectionsLoading = false;
      })
      .addCase(getNFTs.rejected, (state, action) => {
        state.collectionsError = action.payload;
        state.collectionsLoading = false;
      })
      .addCase(getTransactions.pending, state => {
        state.transactionsError = undefined;
        state.transactionsLoading = true;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.transactionsLoading = false;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.transactionsError = action.payload;
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
        state.transaction = { status };
      })
      .addCase(sendToken.fulfilled, state => {
        state.transaction = { status: TRANSACTION_STATUS.success };
      })
      .addMatcher(
        isAnyOf(sendToken.rejected, transferNFT.rejected, burnXtc.rejected),
        state => {
          state.transaction = { status: TRANSACTION_STATUS.error };
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
          state.contactsError = undefined;
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
        (state, action) => {
          if (action.payload) {
            state.contacts = action.payload;
          }
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
          state.contactsError = action.payload;
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
