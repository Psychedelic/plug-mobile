import PlugController from '@psychedelic/plug-controller';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import RNCryptoJS from 'react-native-crypto-js';
import { fetch } from 'react-native-fetch-api';

import { generateMnemonic } from '../../utils/crypto';
import { keyringStorage } from '../store';
import { DEFAULT_ASSETS, getNewAccountData, resetStores } from '../utils';
import {
  getBalance,
  getContacts,
  getNFTs,
  getTransactions,
  setBalance,
  setCollections,
  setTransactions,
} from './user';

const DEFAULT_STATE = {
  instance: null,
  isInitialized: false,
  isUnlocked: false,
  isPrelocked: false,
  currentWallet: null,
  wallets: [],
  icnsDataLoading: false,
};

export const initKeyring = createAsyncThunk('keyring/init', async params => {
  let keyring = new PlugController.PlugKeyRing(
    keyringStorage,
    RNCryptoJS,
    fetch
  );
  await keyring.init();
  if (keyring?.isUnlocked) {
    const state = await keyring.getState();
    if (!state.wallets.length) {
      await keyring.lock();
    }
  }
  params?.callback?.();
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
  }
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

      // Get new data:
      await instance?.getICNSData();
      getNewAccountData(dispatch, icpPrice, state);
      onSuccess?.();
    } catch (e) {
      console.log('Import Wallet Error:', e);
      onError?.();
    }
    return { wallet, unlocked };
  }
);

export const validatePassword = createAsyncThunk(
  'keyring/validatePassword',
  async (params, { getState }) => {
    const state = getState();
    let isValid = false;
    const { password, onError, onSuccess } = params;
    try {
      const instance = state.keyring?.instance;
      isValid = await instance?.checkPassword(password);
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
  }
);

export const getMnemonic = createAsyncThunk(
  'keyring/getMnemonic',
  /**
   * @param {{password: string, onSuccess?: (mnemonic:string) => void, onError?: () => void}} param
   */
  async (param, { getState }) => {
    const state = getState();
    let mnemonic = '';
    const { onError, onSuccess, password } = param;
    try {
      const instance = state.keyring?.instance;
      mnemonic = await instance?.getMnemonic(password);
      if (mnemonic) {
        onSuccess?.(mnemonic);
      } else {
        onError?.();
      }
    } catch (e) {
      onError?.();
      console.log('Get Mnemonic:', e.message);
    }
  }
);

export const lock = createAsyncThunk(
  'keyring/lock',
  async (_, { getState }) => {
    await getState().keyring?.instance?.lock();
    return false;
  }
);

export const login = createAsyncThunk(
  'keyring/login',
  async (params, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const instance = state.keyring?.instance;
    const { icpPrice, password } = params;

    try {
      const unlocked = await instance?.unlock(password);
      await instance?.getICNSData();
      const { wallets, currentWalletId } = await instance?.getState();
      dispatch(setUnlocked(unlocked));
      if (unlocked) {
        dispatch(setPrelocked(false));
        dispatch(setCurrentWallet(wallets[currentWalletId]));
        dispatch(setWallets(wallets));
        dispatch(getBalance());
        dispatch(getTransactions({ icpPrice }));
        dispatch(getNFTs());
        dispatch(getContacts());
      } else {
        return rejectWithValue({ error: 'locked' });
      }
      return unlocked;
    } catch (e) {
      console.log('Error at login: ', e);
      return rejectWithValue({ error: e.message });
    }
  }
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
  }
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
  }
);

export const setCurrentPrincipal = createAsyncThunk(
  'keyring/setCurrentPrincipal',
  async ({ walletNumber, icpPrice }, { getState, dispatch }) => {
    try {
      const state = getState();
      const { instance } = state.keyring;
      await instance?.setCurrentPrincipal(walletNumber);
      await instance?.getICNSData();
      dispatch(setCollections([]));
      dispatch(setTransactions([]));
      dispatch(setBalance(DEFAULT_ASSETS));
      const response = await instance?.getState();
      const { wallets } = response || {};
      const wallet = wallets[walletNumber];
      dispatch(setCurrentWallet(wallet || {}));
      dispatch(getBalance());
      dispatch(getNFTs());
      dispatch(getTransactions({ icpPrice }));
    } catch (e) {
      console.log('setCurrentPrincipal', e.message);
    }
  }
);

export const getICNSData = createAsyncThunk(
  'keyring/getICNSData',
  async (_, { getState, rejectWithValue, dispatch }) => {
    try {
      const { keyring } = getState();
      const icnsData = await keyring.instance?.getICNSData();

      // Set the updated currentWallet and wallets.
      const response = await keyring.instance?.getState();
      const { wallets } = response || {};
      const wallet = wallets[keyring.currentWallet?.walletNumber];
      dispatch(setWallets(wallets));
      dispatch(setCurrentWallet(wallet || {}));

      return icnsData;
    } catch (e) {
      rejectWithValue({ error: e.message });
    }
  }
);

export const setReverseResolvedName = createAsyncThunk(
  'keyring/setReverseResolvedName',
  /**
   * @param {{ name: string, onFinish?: () => void }} param
   */
  async ({ name, onFinish }, { getState, rejectWithValue, dispatch }) => {
    try {
      const { keyring } = getState();
      await keyring.instance?.setReverseResolvedName({
        name,
      });

      dispatch(getICNSData())
        .unwrap()
        .then(() => {
          onFinish?.();
        });
    } catch (e) {
      return rejectWithValue({ error: e.message });
    }
  }
);

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
    setPrelocked: (state, action) => {
      state.isPrelocked = action.payload;
    },
    setWallets: (state, action) => {
      state.wallets = action.payload;
    },
    clear: state => {
      return { ...DEFAULT_STATE, instance: state.instance };
    },
    reset: () => {
      let instance = new PlugController.PlugKeyRing(
        keyringStorage,
        RNCryptoJS,
        fetch
      );
      return { ...DEFAULT_STATE, instance };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getICNSData.pending, state => {
        state.icnsDataLoading = true;
      })
      .addCase(getICNSData.fulfilled, state => {
        state.icnsDataLoading = false;
      })
      .addCase(getICNSData.rejected, state => {
        state.icnsDataLoading = false;
      })
      .addCase(initKeyring.fulfilled, (state, action) => {
        state.instance = action.payload;
        state.isInitialized = action.payload.isInitialized;
        state.isUnlocked = action.payload.isUnlocked;
      })
      .addCase(createSubaccount.fulfilled, (state, action) => {
        if (action.payload) {
          state.wallets = [...state.wallets, action.payload];
        }
      })
      .addCase(editSubaccount.fulfilled, (state, action) => {
        const account = action.payload;
        if (account) {
          state.wallets = state.wallets.map(a =>
            a.walletNumber === account.walletNumber ? account : a
          );
        }
      })
      .addCase(login.rejected, state => {
        state.isUnlocked = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isUnlocked = action.payload;
      })
      .addCase(lock.fulfilled, state => {
        state.isUnlocked = false;
      })
      .addCase(createWallet.fulfilled, (state, action) => {
        const { wallet, unlocked } = action.payload;
        if (Object.keys(wallet).length > 0) {
          state.currentWallet = wallet;
          state.wallets = [wallet];
          state.isInitialized = true;
          state.isUnlocked = unlocked;
        }
      })
      .addCase(importWallet.fulfilled, (state, action) => {
        const { wallet, unlocked } = action.payload;
        if (Object.keys(wallet).length > 0) {
          state.wallets = [wallet];
          state.currentWallet = wallet;
          state.isInitialized = true;
          state.isUnlocked = unlocked;
        }
      });
  },
});

export const {
  setCurrentWallet,
  setUnlocked,
  setPrelocked,
  setWallets,
  clear,
  reset,
} = keyringSlice.actions;

export default keyringSlice.reducer;
