import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import getICPPriceService from '@/services/ICPPriceService';

export const getICPPrice = createAsyncThunk('wallet/getICPPrice', async () => {
  const { data } = await getICPPriceService();
  const icpPrice = data?.['internet-computer']?.usd ?? 1;

  return icpPrice;
});

export const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    icpPrice: null,
  },
  reducers: {
    setICPPrice: (state, action) => {
      state.icpPrice = action.payload;
    },
  },
  extraReducers: {
    [getICPPrice.fulfilled]: (state, action) => {
      state.icpPrice = action.payload;
    },
  },
});

export const { setICPPrice } = walletSlice.actions;

export default walletSlice.reducer;
