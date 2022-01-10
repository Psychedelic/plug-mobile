import { Platform } from 'react-native';
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
      const accessControl = Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET;
      const accessible = Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY;

      const optionKeychain = {
        accessControl,
        accessible,
        service: DEFAULT_KEYCHAIN_OPTIONS.service,
        storage: DEFAULT_KEYCHAIN_OPTIONS.storage,
      };

      const authenticationPrompt = {
        title: DEFAULT_KEYCHAIN_OPTIONS.authenticationPromptTitle,
        description: DEFAULT_KEYCHAIN_OPTIONS.authenticationPromptDesc,
      };

      await Keychain.setGenericPassword(
        KEYCHAIN_USER,
        password,
        optionKeychain,
      );

      // To get biometrics prompt
      if (Platform.OS === 'ios') {
        await Keychain.getGenericPassword({
          authenticationPrompt,
          service: DEFAULT_KEYCHAIN_OPTIONS.service,
          accessControl,
        });
      }
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
