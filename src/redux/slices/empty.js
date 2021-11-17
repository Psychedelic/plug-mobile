import { createSlice } from '@reduxjs/toolkit';

export const emptySlice = createSlice({
  name: 'empty',
  initialState: {
    test: null,
  },
  reducers: {
    setTest: (state, action) => {
      state.test = action.payload;
    },
  },
});

export const {
  setTest,
} = emptySlice.actions;

export default emptySlice.reducer;
