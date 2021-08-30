import AuthReducer from './slices/auth';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import {MMKV} from 'react-native-mmkv';

// Unfortunately redux-persist expects Promises,
// so we have to wrap our sync calls with Promise resolvers/rejecters
export const storage = {
  setItem: (key, value) => {
    MMKV.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = MMKV.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    MMKV.delete(key);
    return Promise.resolve();
  },
};

const authPersistConfig = {
  key: 'auth',
  storage,
};

const createRootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, AuthReducer),
});

export default createRootReducer;
