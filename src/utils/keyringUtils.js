import { privateGetTransactions, privateGetAssets } from '../redux/slices/user';

export const getPrivateAssetsAndTransactions = async (
  icpPrice,
  state,
  dispatch,
) =>
  Promise.all([
    privateGetTransactions({ icpPrice }, state),
    privateGetAssets({ refresh: true, icpPrice }, state, dispatch),
  ]);
