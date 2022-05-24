import { privateGetAssets, privateGetTransactions } from '@/redux/slices/user';

export const getPrivateAssetsAndTransactions = async (
  icpPrice,
  state,
  dispatch
) =>
  Promise.all([
    privateGetTransactions({ icpPrice }, state, dispatch),
    privateGetAssets({ refresh: true, icpPrice }, state, dispatch),
  ]);
