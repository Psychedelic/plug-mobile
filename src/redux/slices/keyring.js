import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PlugKeyRing } from '@psychedelic/plug-controller';
import { keyringStorage } from '../configureReducer';

export const initKeyring = createAsyncThunk('keyring/init', async () => {
  const keyring = new PlugKeyRing(keyringStorage);
  const res = await keyring.init();
  console.log('KEYRING INIT', res, keyring);
  return keyring;
});

export const keyringSlice = createSlice({
  name: 'keyring',
  initialState: {
    keyring: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(initKeyring.fulfilled, (state, action) => {
      state.keyring = action.payload;
    });
  },
});

export const { login } = keyringSlice.actions;

export default keyringSlice.reducer;
