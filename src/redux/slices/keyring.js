import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PlugController from '@psychedelic/plug-controller';
import { keyringStorage } from '../configureReducer';

export const initKeyring = createAsyncThunk('keyring/init', async () => {
  const keyring = new PlugController.PlugKeyRing(keyringStorage);
  await keyring.init();
  return keyring;
});

export const keyringSlice = createSlice({
  name: 'keyring',
  initialState: {
    instance: null,
    state: {},
    isInitialized: false,
    isUnlocked: false,
  },
  reducers: {},
  extraReducers: {
    [initKeyring.fulfilled]: (state, action) => {
      state.instance = action.payload;
      //state.isInitialized = action.payload.isInitialized;
      //state.isUnlocked = action.payload.isUnlocked;
    },
  },
});

export const {} = keyringSlice.actions;

export default keyringSlice.reducer;
