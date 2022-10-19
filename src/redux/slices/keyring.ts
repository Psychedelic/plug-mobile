import { CreatePrincipalOptions } from '@psychedelic/plug-controller/dist/PlugKeyRing/interfaces';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { KeyringState, State, Wallet } from '@/interfaces/redux';
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

const DEFAULT_STATE: KeyringState = {
  isInitialized: false,
  isUnlocked: false,
  isPrelocked: false,
  currentWallet: null,
  wallets: [],
  icnsDataLoading: false,
};

export const initKeyring = createAsyncThunk(
  'keyring/init',
  async (params: { callback?: () => void }) => {
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
  }
);

export const createWallet = createAsyncThunk(
  'keyring/createWallet',
  async (
    { password, icpPrice }: { password: string; icpPrice: number },
    { dispatch, rejectWithValue }
  ) => {
    // Reset previous state:
    resetStores(dispatch);
    try {
      // Create Wallet and unlock
      const instance = KeyRing.getInstance();
      const mnemonic = await generateMnemonic();
      const response = await instance?.importMnemonic({ password, mnemonic });
      const { wallet } = response || {};
      const unlocked = await instance?.unlock(password);

      // Get new data:
      getNewAccountData(dispatch, icpPrice);
      return { wallet, mnemonic, unlocked };
    } catch (e: any) {
      console.log('Error at createWallet: ', e);
      return rejectWithValue(e.message);
    }
  }
);

export const importWallet = createAsyncThunk(
  'keyring/importWallet',
  async (
    params: {
      icpPrice: number;
      password: string;
      mnemonic: string;
      onError?: () => void;
      onSuccess?: () => void;
    },
    { dispatch, rejectWithValue }
  ) => {
    const { icpPrice, password, mnemonic, onError, onSuccess } = params;
    let unlocked = false;
    // Reset previous state:
    resetStores(dispatch);
    try {
      // Import Wallet and unlock
      const instance = KeyRing.getInstance();
      const response = await instance?.importMnemonic({
        password,
        mnemonic,
      });
      const wallet = response?.wallet;
      unlocked = await instance?.unlock(params.password);

      // Get new data:
      await instance?.getICNSData({});
      getNewAccountData(dispatch, icpPrice);
      onSuccess?.();
      return { wallet, unlocked };
    } catch (e: any) {
      console.log('Import Wallet Error:', e.message);
      onError?.();
      return rejectWithValue(e.message);
    }
  }
);

export const validatePassword = createAsyncThunk(
  'keyring/validatePassword',
  async (params: {
    password: string;
    onError?: () => void;
    onSuccess?: () => void;
  }) => {
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
    } catch (e: any) {
      onError?.();
      console.log('Validate Password:', e.message);
    }
    return isValid;
  }
);

export const getMnemonic = createAsyncThunk(
  'keyring/getMnemonic',
  async (param: {
    password: string;
    onSuccess?: (mnemonic: string) => void;
    onError?: () => void;
  }) => {
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
    } catch (e: any) {
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
  async (
    params: { icpPrice: number; password: string },
    { dispatch, rejectWithValue }
  ) => {
    const instance = KeyRing.getInstance();
    const { icpPrice, password } = params;

    try {
      const unlocked = await instance?.unlock(password);
      await instance?.getICNSData({});
      const { wallets, currentWalletId } = await instance?.getState();
      if (unlocked) {
        dispatch(setCurrentWallet(wallets[currentWalletId!]));
        dispatch(setWallets(wallets));
        dispatch(getBalance());
        dispatch(getTransactions({ icpPrice }));
        dispatch(getNFTs());
        dispatch(getContacts());
      } else {
        return rejectWithValue('locked');
      }
      return unlocked;
    } catch (e: any) {
      console.log('Error at login: ', e);
      return rejectWithValue(e.message);
    }
  }
);

export const importAccountFromPem = createAsyncThunk(
  'keyring/importAccountFromPem',
  async (
    { pem, icon, name }: { name: string; icon: string; pem: string },
    { rejectWithValue }
  ) => {
    try {
      const instance = KeyRing.getInstance();
      const response = await instance?.importAccountFromPem({
        pem,
        icon,
        name,
      });
      return response;
    } catch (e: any) {
      // TODO: Add toast to handle error.
      return rejectWithValue(e.message);
    }
  }
);

export const validatePem = createAsyncThunk(
  'keyring/validatePem',
  async (
    {
      pem,
      onSuccess,
      onFailure,
      onFinish,
    }: {
      pem: string;
      onSuccess: () => void;
      onFailure: () => void;
      onFinish: () => void;
    },
    { rejectWithValue }
  ) => {
    try {
      const instance = KeyRing.getInstance();
      const response = await instance?.validatePem({ pem });
      if (response) {
        onSuccess();
      } else {
        onFailure();
      }
      onFinish();
    } catch (e: any) {
      return rejectWithValue({ error: e.message });
    }
  }
);

export const getPemFile = createAsyncThunk(
  'keyring/getPemFile',
  async (
    {
      walletId,
      onSuccess,
      onFailure,
      onFinish,
    }: {
      walletId: string;
      onSuccess: (content: string) => void;
      onFailure?: () => void;
      onFinish?: () => void;
    },
    { rejectWithValue }
  ) => {
    try {
      const instance = KeyRing.getInstance();
      const response = await instance?.getPemFile(walletId);
      if (response) {
        await onSuccess(response);
      } else {
        onFailure?.();
      }
      onFinish?.();
    } catch (e: any) {
      onFinish?.();
      return rejectWithValue(e.message);
    }
  }
);

export const createSubaccount = createAsyncThunk(
  'keyring/createSubaccount',
  async (params: CreatePrincipalOptions, { rejectWithValue }) => {
    try {
      const instance = KeyRing.getInstance();
      await instance?.getState();
      const response = await instance?.createPrincipal(params);
      return response;
    } catch (e: any) {
      console.log('createSubaccount', e);
      return rejectWithValue(e.message);
    }
  }
);

export const editSubaccount = createAsyncThunk(
  'keyring/editSubaccount',
  async (
    params: { walletId: string; name: string; icon: string },
    { getState, rejectWithValue }
  ) => {
    try {
      const { walletId, name, icon } = params;
      const instance = KeyRing.getInstance();
      const state = getState() as State;
      const { currentWallet, wallets } = state.keyring;
      await instance?.editPrincipal(walletId, {
        name,
        emoji: icon,
      });

      return {
        wallet: {
          ...wallets?.find(wallet => wallet.walletId === walletId),
          name,
          icon,
        } as Wallet,
        isCurrentWallet: currentWallet?.walletId === walletId,
      };
    } catch (e: any) {
      console.log('editSubaccount', e);
      return rejectWithValue(e.message);
    }
  }
);

export const setCurrentPrincipal = createAsyncThunk(
  'keyring/setCurrentPrincipal',
  async (
    { walletId, icpPrice }: { walletId: string; icpPrice: number },
    { dispatch }
  ) => {
    try {
      const instance = KeyRing.getInstance();
      await instance?.setCurrentPrincipal(walletId);
      await instance?.getICNSData({});
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
    } catch (e: any) {
      console.log('setCurrentPrincipal', e.message);
    }
  }
);

export const getICNSData = createAsyncThunk(
  'keyring/getICNSData',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const instance = KeyRing.getInstance();
      const icnsData = await instance?.getICNSData({});

      // Set the updated currentWallet and wallets.
      const response = await instance?.getState();
      const { wallets, currentWalletId } = response;

      const wallet = wallets[currentWalletId!];
      dispatch(setWallets(wallets));
      dispatch(setCurrentWallet(wallet));

      return icnsData;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const setReverseResolvedName = createAsyncThunk(
  'keyring/setReverseResolvedName',
  async (
    { name, onFinish }: { name: string; onFinish?: () => void },
    { rejectWithValue, dispatch }
  ) => {
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
    } catch (e: any) {
      return rejectWithValue(e.message);
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
