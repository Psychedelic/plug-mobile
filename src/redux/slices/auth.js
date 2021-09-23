import { createSlice } from '@reduxjs/toolkit';

export const walletSlice = createSlice({
  name: 'auth',
  initialState: {
    isInitialized: false,
    isUnlocked: false,
  },
  reducers: {
    login: (state, action) => {
      const { isInitialized, isUnlocked } = action.payload || {};
      state.isInitialized = isInitialized;
      state.isUnlocked = isUnlocked;
    },
  },
});

export const { login } = walletSlice.actions;

export default walletSlice.reducer;
