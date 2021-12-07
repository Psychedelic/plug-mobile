import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getICPPrice from '../../services/ICPPrice';
import { createSlice } from '@reduxjs/toolkit';

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
});

export const { setICPPrice } = walletSlice.actions;

export const selectICPPrice = store => store.icp.icpPrice;

export const useICPPrice = (refetch = false, dependencies = []) => {
  const dispatch = useDispatch();
  const icpPrice = useSelector(selectICPPrice);

  const fetchICPPrice = async () => {
    try {
      const { data } = await getICPPrice();
      console.log('icp price', data);

      dispatch(setICPPrice(data?.['internet-computer']?.usd ?? 1));
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    if (!icpPrice || refetch) {
      fetchICPPrice();
    }
  }, dependencies);

  return icpPrice;
};

export default walletSlice.reducer;
