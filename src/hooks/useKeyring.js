import { useDispatch, useSelector } from 'react-redux';
import * as Keychain from 'react-native-keychain';
import {
  setCurrentWallet,
  setUnlocked,
  setWallets,
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
  storage: Keychain.STORAGE_TYPE.RSA,
};

const useKeyring = () => {
  const { instance } = useSelector(state => state.keyring);
  const dispatch = useDispatch();

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

  return {
    keyring: instance,
    saveBiometrics,
    getState,
    unlock,
  };
};

export default useKeyring;
