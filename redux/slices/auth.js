import {createSlice} from '@reduxjs/toolkit';

/* eslint-disable no-param-reassign */
export const walletSlice = createSlice({
  name: 'auth',
  initialState: {
    isInitialized: false,
    isUnlocked: false,
  },
  reducers: {
    login: (state, action) => {
      state.assetsLoading = action.payload;
    },
  },
});

export const {login} = walletSlice.actions;

export default walletSlice.reducer;
