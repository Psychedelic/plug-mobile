import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PlugController from '@psychedelic/plug-mobile-controller';
import RNCryptoJS from 'react-native-crypto-js';
import { fetch } from 'react-native-fetch-api';

import { getPrivateAssetsAndTransactions } from '../../utils/keyringUtils';
import { generateMnemonic } from '../../utils/crypto';
import { keyringStorage } from '../configureReducer';
import {
  privateGetAssets,
  setAssetsAndLoading,
  privateGetTransactions,
  setAssetsAndTransactions,
} from './user';

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
  return keyring;
});

export const createWallet = createAsyncThunk(
  'keyring/createWallet',
  async (password, { getState }) => {
    const { instance } = getState().keyring;
    const mnemonic = await generateMnemonic();
    const response = await instance?.importMnemonic({ password, mnemonic });
    const { wallet } = response || {};
    await instance?.unlock(password);
    return { wallet, mnemonic };
  },
);

export const importWallet = createAsyncThunk(
  'keyring/importWallet',
  async (params, { getState, dispatch }) => {
    const state = getState();
    const { icpPrice } = params;
    const instance = state.keyring?.instance;
    const response = await instance?.importMnemonic(params);
    const { wallet } = response || {};
    await instance?.unlock(params.password);
    const assets = await privateGetAssets({ refresh: true, icpPrice }, state);
    dispatch(setAssetsAndLoading({ assets }));

    return { wallet };
  },
);

export const unlock = createAsyncThunk(
  'keyring/unlock',
  async (params, { getState, dispatch }) => {
    const { password, icpPrice } = params;
    let unlocked = false;

    try {
      const state = getState();
      const instance = state.keyring?.instance;
      unlocked = await instance?.unlock(password);
      const { wallets, currentWalletId } = await instance?.getState();

      if (unlocked) {
        const assets = await privateGetAssets(
          { refresh: true, icpPrice },
          state,
        );
        const transactions = await privateGetTransactions({ icpPrice }, state);
        dispatch(setAssetsAndTransactions({ assets, transactions }));

        return {
          wallets,
          currentWalletId,
          unlocked,
        };
      }
    } catch (e) {
      console.log('unlock', e.message);
    }
    return { unlocked };
  },
);

export const createSubaccount = createAsyncThunk(
  'keyring/createSubaccount',
  async (params, { getState }) => {
    try {
      const { instance } = getState().keyring;
      await instance?.getState();
      const response = await instance?.createPrincipal(params);
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
      const { walletNumber, name, icon } = params;
      const { instance } = getState().keyring;
      const edited = await instance?.editPrincipal(walletNumber, {
        name,
        emoji: icon,
      });
      return edited;
    } catch (e) {
      console.log('editSubaccount', e);
    }
  },
);

export const setCurrentPrincipal = createAsyncThunk(
  'keyring/setCurrentPrincipal',
  async ({ walletNumber, icpPrice }, { getState, dispatch }) => {
    try {
      const state = getState();
      const { instance } = state.keyring;
      await instance?.setCurrentPrincipal(walletNumber);
      const response = await instance?.getState();
      const { wallets } = response || {};
      const wallet = wallets[walletNumber];
      const [transactions, assets] = await getPrivateAssetsAndTransactions(
        icpPrice,
        state,
      );
      dispatch(setAssetsAndTransactions({ assets, transactions }));

      return { wallet };
    } catch (e) {
      console.log('setCurrentPrincipal', e.message);
    }
  },
);

const DEFAULT_STATE = {
  instance: null,
  isInitialized: false,
  isUnlocked: false,
  currentWallet: null,
  wallets: [],
  password: '',
};

export const keyringSlice = createSlice({
  name: 'keyring',
  initialState: DEFAULT_STATE,
  reducers: {
    setCurrentWallet: (state, action) => {
      state.currentWallet = action.payload;
    },
    setUnlocked: (state, action) => {
      state.isUnlocked = action.payload;
    },
    setWallets: (state, action) => {
      state.wallets = action.payload;
    },
    reset: state => {
      state = DEFAULT_STATE;
    },
  },
  extraReducers: {
    [initKeyring.fulfilled]: (state, action) => {
      state.instance = action.payload;
      state.isInitialized = action.payload.isInitialized;
      state.isUnlocked = action.payload.isUnlocked;
    },
    [createSubaccount.fulfilled]: (state, action) => {
      if (action.payload) {
        state.wallets = [...state.wallets, action.payload];
      }
    },
    [editSubaccount.fulfilled]: (state, action) => {
      const account = action.payload;
      if (account) {
        state.wallets = state.wallets.map(a =>
          a.walletNumber === account.walletNumber ? account : a,
        );
      }
    },
    [unlock.fulfilled]: (state, action) => {
      const { unlocked, wallets, currentWalletId } = action.payload;
      state.isUnlocked = unlocked;
      state.currentWallet = wallets[currentWalletId];
      state.wallets = wallets;
    },
    [createWallet.fulfilled]: (state, action) => {
      const { wallet } = action.payload;
      state.currentWallet = wallet;
      state.wallets = [wallet];
    },
    [importWallet.fulfilled]: (state, action) => {
      const { wallet } = action.payload;
      state.wallets = [wallet];
      state.currentWallet = wallet;
    },
    [setCurrentPrincipal.fulfilled]: (state, action) => {
      const { wallet } = action.payload;
      state.currentWallet = wallet;
    },
  },
});

export const { setCurrentWallet, setUnlocked, setWallets, reset } =
  keyringSlice.actions;

export default keyringSlice.reducer;
