import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { MMKV } from 'react-native-mmkv';
import KeyringReducer from './slices/keyring';

const mmkvStore = new MMKV();

// Unfortunately redux-persist expects Promises,
// so we have to wrap our sync calls with Promise resolvers/rejecters
export const storage = {
  setItem: (key, value) => {
    mmkvStore.set?.(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    // mmkvStore.clearAll();
    if (key) {
      const value = mmkvStore.getString?.(key);
      return Promise.resolve(value);
    }
    const allKeys = mmkvStore.getAllKeys();
    const values = allKeys.reduce(
      (acum, key) => ({
        ...acum,
        [key]:
          mmkvStore.getString(key) ??
          mmkvStore.getBoolean(key) ??
          mmkvStore.getNumber(key),
      }),
      {},
    );
    return Promise.resolve(values);
  },
  removeItem: key => {
    mmkvStore.delete?.(key);
    return Promise.resolve();
  },
  clear: () => {
    mmkvStore.clearAll?.();
    return Promise.resolve();
  },
};

export const keyringStorage = {
  get: storage.getItem,
  set: async values =>
    Promise.all(
      Object.entries(values).map(async ([key, val]) => {
        await storage.setItem(key, val);
      }),
    ),
  clear: storage.clear,
};

const keyringPersistConfig = {
  key: 'keyring',
  storage,
  blacklist: 'instance',
};

const createRootReducer = combineReducers({
  keyring: persistReducer(keyringPersistConfig, KeyringReducer),
});

export default createRootReducer;
