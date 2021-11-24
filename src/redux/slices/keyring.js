import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PlugController from '@psychedelic/plug-controller';
import { keyringStorage } from '../configureReducer';
import RNCryptoJS from 'react-native-crypto-js';
import { fetch } from 'react-native-fetch-api';
import { formatAssets } from '../../utils/assets';

export const initKeyring = createAsyncThunk('keyring/init', async () => {
  let keyring = new PlugController.PlugKeyRing(
    keyringStorage,
    RNCryptoJS,
    fetch,
  );
  await keyring.init();
  if (keyring?.isUnlocked) {
    const state = await keyring.getState();
    if (!state.wallets.length) {
      await keyring.lock();
    }
  }
  console.log('keyring', keyring);
  return keyring;
});

export const createSubaccount = createAsyncThunk(
  'keyring/createSubaccount',
  async (params, { getState }) => {
    try {
      const state = getState();
      const response = await state.keyring.instance?.createPrincipal(params);
      return response;
    } catch (e) {
      console.log('createSubaccount', e);
    }
  },
);

export const editSubaccount = createAsyncThunk(
  'keyring/editSubaccount',
  async (params, { getState }) => {
    try {
      const state = getState();
      await state.keyring.instance?.editPrincipal(params.walletNumber, {
        name: params.name,
        emoji: params.icon,
      });

      const response = state.keyring.instance?.getState();
      const { wallets } = response;
      return wallets[params.walletNumber]; //tell rocky to make the edit return the edited account
    } catch (e) {
      console.log('editSubaccount', e);
    }
  },
);

const DEFAULT_ASSETS = [
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
];

export const keyringSlice = createSlice({
  name: 'keyring',
  initialState: {
    instance: null,
    assets: DEFAULT_ASSETS,
    isInitialized: false,
    isUnlocked: false,
    currentWallet: null,
    wallets: [],
    password: '',
    contacts: [],
  },
  reducers: {
    setCurrentWallet: (state, action) => {
      state.currentWallet = action.payload;
    },
    setAssets: (state, action) => {
      state.assets = formatAssets(action.payload, 50) || DEFAULT_ASSETS;
    },
    setUnlocked: (state, action) => {
      state.isUnlocked = action.payload;
    },
    setWallets: (state, action) => {
      state.wallets = action.payload;
    },
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
  },
  extraReducers: {
    [initKeyring.fulfilled]: (state, action) => {
      state.instance = action.payload;
      state.isInitialized = action.payload.isInitialized;
      state.isUnlocked = action.payload.isUnlocked;
    },
    [createSubaccount.fulfilled]: (state, action) => {
      state.wallets = [...state.wallets, action.payload];
    },
    [editSubaccount.fulfilled]: (state, action) => {
      console.log('payload', action.payload);
      const account = action.payload;
      state.wallets = state.wallets.map(a =>
        a.walletNumber === account.walletNumber ? account : a,
      );
    },
  },
});

export const {
  setCurrentWallet,
  setAssets,
  setUnlocked,
  addContact,
  removeContact,
  setContacts,
  setWallets,
} = keyringSlice.actions;

export default keyringSlice.reducer;
