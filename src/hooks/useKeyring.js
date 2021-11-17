import { useDispatch, useSelector } from 'react-redux';
//import getRandom from '../helpers/random';
import * as Keychain from 'react-native-keychain';
import bip39 from 'react-native-bip39';
import {
  setCurrentWallet,
  setAssets,
  setUnlocked,
} from '../redux/slices/keyring';

const KEYCHAIN_USER = 'plug-user-name';
const DEFAULT_KEYCHAIN_OPTIONS = {
  service: 'ooo.plugwallet',
  authenticationPromptTitle: 'Auth prompt title',
  authenticationPrompt: { title: 'Auth prompt description' },
	authenticationPromptDesc: 'Auth prompt description',
	fingerprintPromptTitle: 'Fingerprint auth title',
	fingerprintPromptDesc: 'Fingerprint auth description',
	fingerprintPromptCancel: 'Fingerprint auth cancel',
};

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

  const createWallet = async (password) => {
    const mnemonic = await generateMnemonic();
    const response = await instance?.importMnemonic({ password, mnemonic });
    const { wallet } = response || {};
    await instance?.unlock(password);
    dispatch(setCurrentWallet(wallet));
    return mnemonic;
  };

  const saveBiometrics = async (password, biometryType) => {
    // Removes stored password in Keychain
    await Keychain.resetGenericPassword();

    if (biometryType) {
      const accessControl = Keychain.ACCESS_CONTROL.BIOMETRY_ANY;
      const access = Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY;

      Keychain.setGenericPassword(KEYCHAIN_USER, password, {
        ...access,
        ...accessControl,
        ...DEFAULT_KEYCHAIN_OPTIONS,
      });
    }
  };

  const importWallet = async params => {
    const response = await instance?.importMnemonic(params);
    const { wallet, mnemonic } = response || {};
    await instance?.unlock(params.password);
    dispatch(setCurrentWallet(wallet));
    return mnemonic;
  };

  const getAssets = async refresh => {
    const response = await instance?.getState();
    const { wallets, currentWalletId } = response || {};
    let assets = wallets?.[currentWalletId]?.assets || [];
    if (assets?.every(asset => !asset.amount) || refresh) {
      assets = await instance?.getBalance();
    } else {
      instance?.getBalance();
    }
    dispatch(setAssets(assets));
    return assets;
  };

  const getState = async () => {
    const response = await instance?.getState();
    if (!response.wallets.length) {
      await instance?.lock();
    } else {
      const { wallets, currentWalletId } = response || {};
      dispatch(setCurrentWallet(wallets[currentWalletId]));
      return response;
    }
  };

  const unlock = async password => {
    let unlocked = false;
    try {
      unlocked = await instance.unlock(password);
      dispatch(setUnlocked(unlocked));
    } catch (e) {
      unlocked = false;
    }
    setUnlocked(unlocked);
    return unlocked;
  };

  return {
    keyring: instance,
    createWallet,
    saveBiometrics,
    importWallet,
    getAssets,
    getState,
    unlock,
  };
};

export default useKeyring;
