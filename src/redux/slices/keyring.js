import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PlugController from '@psychedelic/plug-controller';
import { keyringStorage } from '../configureReducer';
import RNCryptoJS from 'react-native-crypto-js';
import { fetch } from 'react-native-fetch-api';

export const initKeyring = createAsyncThunk('keyring/init', async () => {
  let keyring = new PlugController.PlugKeyRing(
    keyringStorage,
    RNCryptoJS,
    fetch,
  );
  await keyring.init();
  return keyring;
});

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
  },
  reducers: {
    setCurrentWallet: (state, action) => {
      state.currentWallet = action.payload;
    },
    setAssets: (state, action) => {},
  },
  extraReducers: {
    [initKeyring.fulfilled]: (state, action) => {
      state.instance = action.payload;
      state.isInitialized = action.payload.isInitialized;
      state.isUnlocked = action.payload.isUnlocked;
    },
  },
});

export const { setCurrentWallet, setAssets } = keyringSlice.actions;

export default keyringSlice.reducer;
