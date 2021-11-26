import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PlugController from '@psychedelic/plug-controller';
import { keyringStorage } from '../configureReducer';
import RNCryptoJS from 'react-native-crypto-js';
import { fetch } from 'react-native-fetch-api';
import { formatAssets } from '../../utils/assets';

export const recursiveParseBigint = (obj) => Object.entries(obj).reduce(
  (acum, [key, val]) => {
    if (val instanceof Object) {
      const res = Array.isArray(val)
        ? val.map((el) => recursiveParseBigint(el))
        : recursiveParseBigint(val);
      return { ...acum, [key]: res };
    }
    if (typeof val === 'bigint') {
      return { ...acum, [key]: parseInt(val.toString(), 10) };
    }
    return { ...acum, [key]: val };
  },
  { ...obj },
);

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

export const createSubaccount = createAsyncThunk('keyring/createSubaccount', async (params, { getState }) => {
  try {
    const state = getState();
    const response = await state.keyring.instance?.createPrincipal(params);
    return response;
  }
  catch (e) {
    console.log('createSubaccount', e);
  }
});

export const editSubaccount = createAsyncThunk('keyring/editSubaccount', async (params, { getState }) => {
  try {
    const state = getState();
    await state.keyring.instance?.editPrincipal(
      params.walletNumber,
      { name: params.name, emoji: params.icon }
    );

    const response = state.keyring.instance?.getState();
    const { wallets } = response;
    return wallets[params.walletNumber]; //tell rocky to make the edit return the edited account
  }
  catch (e) {
    console.log('editSubaccount', e)
  }
});

export const burnXtc = createAsyncThunk('keyring/burnXtc', async (params, { getState }) => {
  try {
    const state = getState();
    const response = await state.keyring.instance?.burnXTC(params);
    return {
      response: recursiveParseBigint(response),
      status: TRANSACTION_STATUS.success,
    }
  }
  catch (e) {
    console.log('burnXtc', e);
    return {
      error: e.message,
      status: TRANSACTION_STATUS.error,
    }
  }
});

export const sendToken = createAsyncThunk('keyring/sendToken', async (params, { getState }) => {
  try {
    const { to, amount, canisterId, opts } = params;
    const state = getState();
    const { height, transactionId } = await state.keyring.instance?.send(to, BigInt(amount), canisterId, opts);

    return {
      response: {
        height: parseInt(height?.toString?.(), 10),
        transactionId: parseInt(transactionId?.toString?.(), 10),
      },
      status: TRANSACTION_STATUS.success,
    };
  }
  catch (e) {
    console.log('sendToken', e);
    return {
      error: e.message,
      status: TRANSACTION_STATUS.error
    }
  }
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

const DEFAULT_TRANSACTION = {
  height: null,
  transactionId: null,
  status: null,
};

export const TRANSACTION_STATUS = {
  success: 'success',
  error: 'error',
}

const DEFAULT_STATE = {
  instance: null,
  assets: DEFAULT_ASSETS,
  isInitialized: false,
  isUnlocked: false,
  currentWallet: null,
  wallets: [],
  password: '',
  contacts: [],
  transaction: DEFAULT_TRANSACTION,
  activity: [],
};

export const keyringSlice = createSlice({
  name: 'keyring',
  initialState: DEFAULT_STATE,
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
    setTransaction: (state, action) => {
      state.transaction = action.payload;
    },
    setActivity: (state, action) => {
      state.activity = action.payload;
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
      state.wallets = [...state.wallets, action.payload];
    },
    [editSubaccount.fulfilled]: (state, action) => {
      const account = action.payload;
      state.wallets = state.wallets.map(a => (a.walletNumber === account.walletNumber ? account : a));
    },
    [sendToken.fulfilled]: (state, action) => {
      state.transaction = action.payload;
    },
    [burnXtc.fulfilled]: (state, action) => {
      state.transaction = action.payload;
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
  setTransaction,
  setActivity,
  reset,
} = keyringSlice.actions;

export default keyringSlice.reducer;
