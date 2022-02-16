import RNSInfo from 'react-native-sensitive-info';
import { useDispatch } from 'react-redux';

import { setUsingBiometrics } from '../redux/slices/user';

const KEYCHAIN_CONSTANTS = {
  tokenKey: 'plug-accss-token',
  keychainService: 'ooo.plugwallet',
  sharedPreferencesName: 'plug-preferences',
  kSecAccessControl: 'kSecAccessControlBiometryAny',
  kSecUseOperationPrompt: 'We need your permission to retrieve encrypted data',
};

const KEYCHAIN_OPTIONS = {
  touchID: true,
  showModal: true,
  keychainService: KEYCHAIN_CONSTANTS.keychainService,
  sharedPreferencesName: KEYCHAIN_CONSTANTS.sharedPreferencesName,
  kSecAccessControl: KEYCHAIN_CONSTANTS.kSecAccessControl,
  kSecUseOperationPrompt: KEYCHAIN_CONSTANTS.kSecUseOperationPrompt,
};

const useKeychain = () => {
  const dispatch = useDispatch();

  // Core Keychain functions:
  const setPassword = async password => {
    const { tokenKey } = KEYCHAIN_CONSTANTS;

    return RNSInfo.setItem(tokenKey, password, KEYCHAIN_OPTIONS);
  };

  const getPassword = async () => {
    const { tokenKey } = KEYCHAIN_CONSTANTS;
    const password = await RNSInfo.getItem(tokenKey, KEYCHAIN_OPTIONS);
    return password;
  };

  const resetPassword = async () => {
    const { tokenKey } = KEYCHAIN_CONSTANTS;

    return RNSInfo.deleteItem(tokenKey, KEYCHAIN_OPTIONS);
  };

  const isSensorAvailable = async () => {
    return RNSInfo.isSensorAvailable();
  };

  // Statefull Keychain functions:
  const saveBiometrics = async password => {
    try {
      await resetPassword();
      await setPassword(password);
      dispatch(setUsingBiometrics(true));
    } catch {
      dispatch(setUsingBiometrics(false));
    }
  };

  const resetBiometrics = async () => {
    await resetPassword();
    dispatch(setUsingBiometrics(false));
  };

  return {
    saveBiometrics,
    resetBiometrics,
    setPassword,
    getPassword,
    resetPassword,
    isSensorAvailable,
  };
};

export default useKeychain;
