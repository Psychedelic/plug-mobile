import { STORAGE_TYPE } from 'react-native-keychain';

export const KEYCHAIN_USER = 'plug-user-name';

export const DEFAULT_KEYCHAIN_OPTIONS = {
  service: 'ooo.plugwallet',
  authenticationPromptTitle: 'Auth prompt title',
  authenticationPrompt: { title: 'Auth prompt description' },
  authenticationPromptDesc: 'Auth prompt description',
  fingerprintPromptTitle: 'Fingerprint auth title',
  fingerprintPromptDesc: 'Fingerprint auth description',
  fingerprintPromptCancel: 'Fingerprint auth cancel',
  storage: STORAGE_TYPE.RSA,
};

