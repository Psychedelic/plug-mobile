import { asyncGetBalance, privateGetTransactions } from '@/redux/slices/user';

export const getPrivateAssetsAndTransactions = async (
  icpPrice,
  state,
  dispatch
) =>
  Promise.all([
    privateGetTransactions({ icpPrice }, state, dispatch),
    asyncGetBalance(undefined, state, dispatch),
  ]);
