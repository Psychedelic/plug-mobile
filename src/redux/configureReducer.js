import AuthReducer from './slices/auth';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { MMKV } from 'react-native-mmkv';
import KeyringReducer from './slices/keyring';

// Unfortunately redux-persist expects Promises,
// so we have to wrap our sync calls with Promise resolvers/rejecters
export const storage = {
  setItem: (key, value) => {
    MMKV?.set?.(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = MMKV?.getString?.(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    MMKV?.delete?.(key);
    return Promise.resolve();
  },
  clear: () => {
    MMKV?.clearAll?.();
    return Promise.resolve();
  },
};

export const keyringStorage = {
  get: storage.getItem,
  set: storage.setItem,
  clear: storage.clear,
};

const authPersistConfig = {
  key: 'auth',
  storage,
};

const keyringPersistConfig = {
  key: 'keyring',
  storage,
};

const createRootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, AuthReducer),
  keyring: persistReducer(keyringPersistConfig, KeyringReducer),
});

export default createRootReducer;
