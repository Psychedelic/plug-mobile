import { CONNECTION_STATUS } from '@/constants/walletconnect';
import { walletConnectStorage } from '@/redux/store';

const storage = walletConnectStorage;

const addDisconnectedEntry = ({ apps, appUrl }) => {
  const date = new Date().toISOString();
  return {
    ...apps,
    [appUrl]: {
      ...apps[appUrl],
      status: CONNECTION_STATUS.disconnected,
      date,
      events: [
        ...(apps[appUrl]?.events || []),
        {
          status: CONNECTION_STATUS.disconnected,
          date,
        },
      ],
    },
  };
};

const secureGetWrapper = async (key, defaultValue) => {
  try {
    const state = await storage.get(key);
    return state || defaultValue;
  } catch (e) {
    if (defaultValue) {
      return defaultValue;
    }
    throw e;
  }
};

const secureSetWrapper = async (setArguments, defaultValue) => {
  try {
    const result = await storage.set(setArguments);
    return result || defaultValue;
  } catch (e) {
    if (defaultValue) {
      return defaultValue;
    }
    throw e;
  }
};

export const getApps = async currentWalletId => {
  const defaultValue = {};
  const state = await secureGetWrapper(currentWalletId, defaultValue);
  return state?.apps || defaultValue;
};

export const getApp = async (currentWalletId, appUrl) => {
  const defaultValue = {};

  const state = await secureGetWrapper(currentWalletId, defaultValue);

  return state?.apps?.[appUrl] || defaultValue;
};

export const setApps = (currentWalletId, apps) => {
  const defaultValue = false;
  return secureSetWrapper({ [currentWalletId]: { apps } }, defaultValue);
};

export const removeApp = async (currentWalletId, appUrl) => {
  const defaultValue = false;

  const apps = await getApps(currentWalletId, undefined);

  if (apps && apps[appUrl]) {
    const newApps = addDisconnectedEntry({ apps, appUrl });
    return setApps(currentWalletId, newApps);
  }

  return defaultValue;
};

export const setRouter = route => {
  const defaultValue = false;

  return secureSetWrapper({ router: route }, defaultValue);
};

export const getContacts = async () => {
  const defaultValue = [];

  const state = await secureGetWrapper(['contacts'], defaultValue);

  return state?.contacts || defaultValue;
};

export const setContacts = contacts => {
  const defaultValue = false;

  return secureSetWrapper({ contacts }, defaultValue);
};

export const setHiddenAccounts = hiddenAccounts => {
  const defaultValue = false;

  return secureSetWrapper({ hiddenAccounts }, defaultValue);
};

export const getHiddenAccounts = async () => {
  const defaultValue = {};

  const state = await secureGetWrapper('hiddenAccounts', defaultValue);

  return state?.hiddenAccounts || defaultValue;
};

export const getAppsKey = async () => {
  const defaultValue = {};

  return secureGetWrapper('apps', defaultValue);
};

export const clearStorage = () => {
  return new Promise((resolve, reject) => {
    try {
      storage.clear(() => resolve(true));
    } catch (e) {
      resolve(false);
    }
  });
};

export const setProtectedIds = (protectedIds = []) => {
  return secureSetWrapper({ protectedIds }, []);
};

export const getProtectedIds = async () => {
  const defaultValue = [];

  const state = await secureGetWrapper('protectedIds', defaultValue);
  return state || defaultValue;
};

export const setUseICNS = (useICNS, walletNumber) => {
  const defaultValue = true;
  return secureSetWrapper({ icns: { [walletNumber]: useICNS } }, defaultValue);
};

export const getUseICNS = async walletNumber => {
  const defaultValue = true;

  const state = await secureGetWrapper('icns', defaultValue);
  return state?.[parseInt(walletNumber, 10)] || defaultValue;
};

export const setBatchTransactions = (batchTransactions = {}) => {
  return secureSetWrapper({ batchTransactions }, false);
};

export const getBatchTransactions = async () => {
  const defaultValue = {};

  const state = await secureGetWrapper('batchTransactions', defaultValue);

  return state || defaultValue;
};
