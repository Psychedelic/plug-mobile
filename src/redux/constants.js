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

export const DEFAULT_ASSETS = [
  {
    symbol: 'ICP',
    name: 'ICP',
    amount: 0,
    value: 0,
    icon: 'dfinity',
  },
  {
    symbol: 'XTC',
    name: 'Cycles',
    amount: 0,
    value: 0,
    icon: 'xtc',
  },
];

export const TRANSACTION_STATUS = {
  success: 'success',
  error: 'error',
};

export const recursiveParseBigint = obj =>
  Object.entries(obj).reduce(
    (acum, [key, val]) => {
      if (val instanceof Object) {
        const res = Array.isArray(val)
          ? val.map(el => recursiveParseBigint(el))
          : recursiveParseBigint(val);
        return { ...acum, [key]: res };
      }
      if (typeof val === 'bigint') {
        return { ...acum, [key]: parseInt(val.toString(), 10) };
      }
      return { ...acum, [key]: val };
    },
    { ...obj },
  );
