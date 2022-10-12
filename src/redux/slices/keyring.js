import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import KeyRing from '@/modules/keyring';

import { generateMnemonic } from '../../utils/crypto';
import {
  DEFAULT_ASSETS,
  formatWallets,
  getNewAccountData,
  resetStores,
} from '../utils';
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
  isInitialized: false,
  isUnlocked: false,
  isPrelocked: false,
  currentWallet: null,
  wallets: [],
  icnsDataLoading: false,
};

export const initKeyring = createAsyncThunk('keyring/init', async params => {
  let keyring = KeyRing.getInstance();
  await keyring.init();
  if (keyring?.isUnlocked) {
    const state = await keyring.getState();
    if (!state.wallets.length) {
      await keyring.lock();
    }
  }
  params?.callback?.();
  return {
    isUnlocked: keyring.isUnlocked,
    isInitialized: keyring.isInitialized,
  };
});

export const createWallet = createAsyncThunk(
  'keyring/createWallet',
  async ({ password, icpPrice }, { getState, dispatch }) => {
    // Reset previous state:
    resetStores(dispatch);
    try {
      // Create Wallet and unlock
      const state = getState();
      const instance = KeyRing.getInstance();
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
      const instance = KeyRing.getInstance();
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
  async params => {
    let isValid = false;
    const { password, onError, onSuccess } = params;
    try {
      const instance = KeyRing.getInstance();
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
  async param => {
    let mnemonic = '';
    const { onError, onSuccess, password } = param;
    try {
      const instance = KeyRing.getInstance();
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

export const lock = createAsyncThunk('keyring/lock', async () => {
  const instance = KeyRing.getInstance();
  await instance?.lock();
  return false;
});

export const login = createAsyncThunk(
  'keyring/login',
  async (params, { dispatch, rejectWithValue }) => {
    const instance = KeyRing.getInstance();
    const { icpPrice, password } = params;

    try {
      const unlocked = await instance?.unlock(password);
      await instance?.getICNSData();
      const { wallets, currentWalletId } = await instance?.getState();
      if (unlocked) {
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

export const importAccountFromPem = createAsyncThunk(
  'keyring/importAccountFromPem',
  /**
   * @param {{ name: string, icon: string, pem: string }} params
   */
  async params => {
    try {
      const instance = KeyRing.getInstance();
      const response = await instance?.importAccountFromPem(params);
      return response;
    } catch (e) {
      console.log('importAccountFromPem', e);
    }
  }
);

export const createSubaccount = createAsyncThunk(
  'keyring/createSubaccount',
  async params => {
    try {
      const instance = KeyRing.getInstance();
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
  async (params, { getState }) => {
    try {
      const { walletId, name, icon } = params;
      const instance = KeyRing.getInstance();
      const { currentWallet, wallets } = getState().keyring;
      await instance?.editPrincipal(walletId, {
        name,
        emoji: icon,
      });

      return {
        wallet: {
          ...wallets?.find(wallet => wallet.walletId === walletId),
          name,
          icon,
        },
        isCurrentWallet: currentWallet?.walletId === walletId,
      };
    } catch (e) {
      console.log('editSubaccount', e);
    }
  }
);

export const setCurrentPrincipal = createAsyncThunk(
  'keyring/setCurrentPrincipal',
  async ({ walletId, icpPrice }, { dispatch }) => {
    try {
      const instance = KeyRing.getInstance();
      await instance?.setCurrentPrincipal(walletId);
      await instance?.getICNSData();
      dispatch(setCollections([]));
      dispatch(setTransactions([]));
      dispatch(setBalance(DEFAULT_ASSETS));
      const response = await instance?.getState();
      const { wallets } = response || {};
      const wallet = wallets[walletId];
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
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const instance = KeyRing.getInstance();
      const icnsData = await instance?.getICNSData();

      // Set the updated currentWallet and wallets.
      const response = await instance?.getState();
      const { wallets, currentWalletId } = response;

      const wallet = wallets[currentWalletId];
      dispatch(setWallets(wallets));
      dispatch(setCurrentWallet(wallet));

      return icnsData;
    } catch (e) {
      return rejectWithValue({ error: e.message });
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
      const instance = KeyRing.getInstance();
      await instance?.setReverseResolvedName({
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
      state.wallets = formatWallets(action.payload);
    },
    clear: () => {
      return { ...DEFAULT_STATE };
    },
    reset: () => {
      KeyRing.reset();
      return { ...DEFAULT_STATE };
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
        state.isInitialized = action.payload.isInitialized;
        state.isUnlocked = action.payload.isUnlocked;
      })
      .addCase(editSubaccount.fulfilled, (state, action) => {
        const { isCurrentWallet, wallet } = action.payload;
        if (isCurrentWallet) {
          state.currentWallet = wallet;
        }
        state.wallets = state.wallets.map(w =>
          w.walletId === wallet.walletId ? wallet : w
        );
      })
      .addCase(login.rejected, state => {
        state.isUnlocked = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isUnlocked = action.payload;
        state.isPrelocked = false;
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
      })
      .addMatcher(
        isAnyOf(createSubaccount.fulfilled, importAccountFromPem.fulfilled),
        (state, action) => {
          if (action.payload) {
            state.wallets = [...state.wallets, action.payload];
          }
        }
      );
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
