import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  closeAllModals: false,
};

export const closeAllModals = createAsyncThunk(
  'alert/closeAllModals',
  async (_, { dispatch }) => {
    dispatch(setCloseAllModals(true));
    setTimeout(() => dispatch(setCloseAllModals(false)), 500);
  }
);

export const alertSlice = createSlice({
  name: 'alert',
  initialState: INITIAL_STATE,
  reducers: {
    setCloseAllModals: (state, action) => {
      state.closeAllModals = action.payload;
    },
    reset: () => {
      return INITIAL_STATE;
    },
  },
});

export const { setCloseAllModals, reset } = alertSlice.actions;

export default alertSlice.reducer;
