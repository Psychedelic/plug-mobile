import RNSInfo from 'react-native-sensitive-info';

const KEYCHAIN_CONSTANTS = {
  tokenKey: 'plug-accss-token',
  keychainService: 'ooo.plugwallet',
  sharedPreferencesName: 'plug-preferences',
  kSecAccessControl: 'kSecAccessControlBiometryAny',
  kSecUseOperationPrompt: 'We need your permission to retrieve encrypted data',
};

const KEYCHAIN_OPTIONS = {
  touchId: true,
  showModal: true,
  keychainService: KEYCHAIN_CONSTANTS.keychainService,
  sharedPreferencesName: KEYCHAIN_CONSTANTS.sharedPreferencesName,
  kSecAccessControl: KEYCHAIN_CONSTANTS.kSecAccessControl,
  kSecUseOperationPrompt: KEYCHAIN_CONSTANTS.kSecUseOperationPrompt, 
}

export default {
  async setPassword(password) {
    const { tokenKey } = KEYCHAIN_CONSTANTS;

    return RNSInfo.setItem(
      tokenKey,
      password,
      KEYCHAIN_OPTIONS,
    );
  },

  async getPassword() {
    const { tokenKey } = KEYCHAIN_CONSTANTS;

    return RNSInfo.getItem(
      tokenKey,
      KEYCHAIN_OPTIONS
    );
  },

  async resetPassword() {
    const { tokenKey } = KEYCHAIN_CONSTANTS;

    return RNSInfo.deleteItem(
      tokenKey,
      KEYCHAIN_OPTIONS
    );
  },

  async isSensorAvailable() {
    return RNSInfo.isSensorAvailable();
  },
};
