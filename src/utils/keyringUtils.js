import {
  privateGetTransactions,
  privateGetAssets,
} from '../redux/slices/keyring';

export const getPrivateAssetsAndTransactions = async (icpPrice, state) =>
  Promise.all([
    privateGetTransactions({ icpPrice }, state),
    privateGetAssets({ refresh: true, icpPrice }, state),
  ]);
