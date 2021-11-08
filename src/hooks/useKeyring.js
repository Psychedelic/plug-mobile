import { useDispatch, useSelector } from 'react-redux';
//import getRandom from '../helpers/random';
import bip39 from 'react-native-bip39';
import { setCurrentWallet, setAssets } from '../redux/slices/keyring';

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
    const { wallet } = await instance.importMnemonic({ password, mnemonic });
    await instance.unlock(password);
    dispatch(setCurrentWallet(wallet));
    return mnemonic;
  };

  const importWallet = async params => {
    const { wallet, mnemonic } = await instance.importMnemonic(params);
    await instance.unlock(params.password);
    dispatch(setCurrentWallet(wallet));
    return mnemonic;
  };

  const getAssets = async refresh => {
    const { wallets, currentWalletId } = await instance.getState();
    let assets = wallets?.[currentWalletId]?.assets;
    if (assets?.every(asset => !asset.amount) || refresh) {
      assets = await instance.getBalance();
    } else {
      instance.getBalance();
    }
    dispatch(setAssets(assets));
    return assets;
  };

  return { keyring: instance, createWallet, importWallet, getAssets };
};

export default useKeyring;
