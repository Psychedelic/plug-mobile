import { useDispatch, useSelector } from 'react-redux';
//import getRandom from '../helpers/random';
import bip39 from 'react-native-bip39';
import {
  setCurrentWallet,
  setUnlocked,
  setWallets,
  setTransactions,
} from '../redux/slices/keyring';
import { formatAssetBySymbol, TOKEN_IMAGES } from '../utils/assets';
import { ACTIVITY_STATUS } from '../screens/Profile/components/constants';
import { recursiveParseBigInt } from '../utils/objects';

const generateMnemonic = async () => {
  try {
    return await bip39.generateMnemonic(128);
  } catch (e) {
    console.log(e);
    return false;
  }
};

const useKeyring = () => {
  const { instance } = useSelector(state => state.keyring);
  const dispatch = useDispatch();

  const createWallet = async password => {
    const mnemonic = await generateMnemonic();
    const response = await instance?.importMnemonic({ password, mnemonic });
    const { wallet } = response || {};
    await instance?.unlock(password);
    dispatch(setCurrentWallet(wallet));
    return mnemonic;
  };

  const importWallet = async params => {
    const response = await instance?.importMnemonic(params);
    const { wallet, mnemonic } = response || {};
    await instance?.unlock(params.password);
    dispatch(setCurrentWallet(wallet));
    return mnemonic;
  };

  const getState = async () => {
    const response = await instance?.getState();
    if (!response.wallets.length) {
      await instance?.lock();
    } else {
      const { wallets, currentWalletId } = response || {};
      dispatch(setWallets(wallets));
      dispatch(setCurrentWallet(wallets[currentWalletId]));
      return response;
    }
  };

  const unlock = async password => {
    let unlocked = false;
    try {
      unlocked = await instance.unlock(password);
      dispatch(setUnlocked(unlocked));
      await getState();
    } catch (e) {
      unlocked = false;
    }
    setUnlocked(unlocked);
    return unlocked;
  };

  const getActivity = async () => {
    try {
      const response = await instance?.getTransactions();
      const mapTransaction = trx => {
        const asset = formatAssetBySymbol(
          trx?.details?.amount,
          trx?.details?.currency?.symbol,
          50, // TODO: Use proper ICP price.
        );
        const transaction = recursiveParseBigInt({
          ...asset,
          type: trx?.type,
          hash: trx?.hash,
          to: trx?.details?.to,
          from: trx?.details?.from,
          date: new Date(trx?.timestamp),
          status: ACTIVITY_STATUS[trx?.details?.status],
          image: TOKEN_IMAGES[trx?.details?.currency?.symbol] || '',
          symbol: trx?.details?.currency?.symbol,
          canisterId: trx?.details?.canisterId,
          plug: null,
          canisterInfo: trx?.canisterInfo,
          details: trx?.details,
        });
        return transaction;
      };
      const parsedTrx = response?.transactions?.map(mapTransaction) || [];
      dispatch(setActivity(parsedTrx));
      return parsedTrx;
    } catch (e) {
      console.log(e);
      return [];
    }
  };

  return {
    keyring: instance,
    createWallet,
    importWallet,
    getState,
    getActivity,
    unlock,
  };
};

export default useKeyring;
