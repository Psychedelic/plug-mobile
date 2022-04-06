import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PlugController from '@psychedelic/plug-mobile-controller';
import { fetch } from 'react-native-fetch-api';

import { getPrivateAssetsAndTransactions } from '../../utils/keyringUtils';
import { generateMnemonic } from '../../utils/crypto';
import { resetStores, getNewAccountData } from '../utils';
import { keyringStorage } from '../store';

import {
  getNFTs,
  getAssets,
  getTransactions,
  setAssetsLoading,
  setTransactionsLoading,
  setAssetsAndTransactions,
} from './user';

export const initKeyring = createAsyncThunk('keyring/init', async () => {
  let keyring = new PlugController.PlugKeyRing(keyringStorage, fetch);
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
  async ({ password, icpPrice }, { getState, dispatch }) => {
    // Reset previous state:
    resetStores(dispatch);
    try {
      // Create Wallet and unlock
      const state = getState();
      const instance = getState().keyring?.instance;
      const mnemonic = await generateMnemonic();
      const response = await instance?.importMnemonic({ password, mnemonic });
      const { wallet } = response || {};
      const unlocked = await instance?.unlock(password);

      // Get new data:
      getNewAccountData(dispatch, icpPrice, state);
      return { wallet, mnemonic, unlocked };
    } catch (e) {
      console.log('Error at createWallet: ', e);
    }
  },
);

export const importWallet = createAsyncThunk(
  'keyring/importWallet',
  async (params, { getState, dispatch }) => {
    const { icpPrice, password, mnemonic, onError, onSuccess } = params;
    let wallet = {};
    let unlocked = false;
    // Reset previous state:
    resetStores(dispatch);
    try {
      // Import Wallet and unlock
      const state = getState();
      const instance = state.keyring?.instance;
      const response = await instance?.importMnemonic({
        icpPrice,
        password,
        mnemonic,
      });
      wallet = response?.wallet;
      unlocked = await instance?.unlock(params.password);
      dispatch(setUnlocked(unlocked));
      // Get new data:
      getNewAccountData(dispatch, icpPrice, state);
      onSuccess?.();
    } catch (e) {
      console.log('Import Wallet Error:', e);
      onError?.();
    }
    return { wallet };
  },
);

export const validatePassword = createAsyncThunk(
  'keyring/validatePassword',
  async (params, { getState }) => {
    const state = getState();
    let isValid = false;
    const { password, onError, onSuccess } = params;
    try {
      const instance = state.keyring?.instance;
      isValid = await instance?.isValidPassword(password);
      if (isValid) {
        onSuccess?.();
      } else {
        onError?.();
      }
    } catch (e) {
      onError?.();
      console.log('Validate Password:', e.message);
    }
    return isValid;
  },
);

export const unlock = createAsyncThunk(
  'keyring/unlock',
  async (params, { getState }) => {
    const state = getState();
    return await privateUnlock(params, state);
  },
);

const privateUnlock = async (params, state) => {
  let unlocked = false;
  const { password, onError, onSuccess } = params;
  try {
    const instance = state.keyring?.instance;
    unlocked = await instance?.unlock(password);
    if (unlocked) {
      onSuccess?.();
    } else {
      onError?.();
    }
  } catch (e) {
    onError?.();
    console.log('Private Unlock:', e.message);
  }
  return { unlocked };
};

export const login = createAsyncThunk(
  'keyring/login',
  async (params, { getState, dispatch }) => {
    const state = getState();
    const instance = state.keyring?.instance;
    const { icpPrice, onError } = params;
    const handleError = () => {
      dispatch(setAssetsLoading(false));
      onError?.();
    };

    try {
      const { unlocked } = await privateUnlock(params, state);
      const { wallets, currentWalletId } = await instance?.getState();
      if (unlocked) {
        dispatch(setCurrentWallet(wallets[currentWalletId]));
        dispatch(setWallets(wallets));
        dispatch(setAssetsLoading(true));
        dispatch(getAssets({ refresh: true, icpPrice }));
        dispatch(setTransactionsLoading(true));
        dispatch(getTransactions({ icpPrice }));
        dispatch(getNFTs());
      } else {
        handleError();
      }
      return unlocked;
    } catch (e) {
      console.log('Error at login: ', e);
      handleError();
    }
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
  async (params, { getState, dispatch }) => {
    try {
      const { walletNumber, name, icon } = params;
      const { instance, currentWallet, wallets } = getState().keyring;
      const edited = await instance?.editPrincipal(walletNumber, {
        name,
        emoji: icon,
      });
      if (edited && currentWallet?.walletNumber === walletNumber) {
        dispatch(setCurrentWallet({ ...wallets[walletNumber], name, icon }));
      }
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
        dispatch,
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
      state = { ...DEFAULT_STATE, instance: state.instance };
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
    [login.fulfilled]: (state, action) => {
      state.isUnlocked = action.payload;
    },
    [unlock.fulfilled]: (state, action) => {
      const { unlocked } = action.payload;
      state.isUnlocked = unlocked;
    },
    [createWallet.fulfilled]: (state, action) => {
      const { wallet, unlocked } = action.payload;
      state.currentWallet = wallet;
      state.wallets = [wallet];
      state.isInitialized = true;
      state.isUnlocked = unlocked;
    },
    [importWallet.fulfilled]: (state, action) => {
      const { wallet } = action.payload;
      state.wallets = [wallet];
      state.currentWallet = wallet;
      state.isInitialized = true;
    },
    [setCurrentPrincipal.fulfilled]: (state, action) => {
      state.currentWallet = action.payload?.wallet || {};
    },
  },
});

export const { setCurrentWallet, setUnlocked, setWallets, reset } =
  keyringSlice.actions;

export default keyringSlice.reducer;
