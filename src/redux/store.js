import AsyncStorage from '@react-native-async-storage/async-storage';
import Flatted from 'flatted';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createTransform, persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import {
  KEYRING_KEYS_IN_STORAGE,
  KEYRING_STORAGE_KEY,
} from '@/constants/keyring';
import { WALLETCONNECT_STORAGE_KEY } from '@/constants/walletconnect';

import Reactotron from '../config/reactotron';
import IcpReducer from './slices/icp';
import KeyringReducer from './slices/keyring';
import UserReducer from './slices/user';
import WalletConnectReducer from './slices/walletconnect';

// PERSIST
export const transformCircular = createTransform(
  inboundState => Flatted.stringify(inboundState),
  outboundState => Flatted.parse(outboundState)
);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [transformCircular],
};

const icpPersistConfig = {
  key: 'icp',
  storage: AsyncStorage,
};

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
  transforms: [transformCircular],
};

// REDUCER

const rootReducer = combineReducers({
  keyring: KeyringReducer,
  icp: persistReducer(icpPersistConfig, IcpReducer),
  user: persistReducer(userPersistConfig, UserReducer),
  walletconnect: WalletConnectReducer,
});

const middlewares = [thunk];
const enhancers = [];

enhancers.push(applyMiddleware(...middlewares));

if (__DEV__) {
  enhancers.push(Reactotron.createEnhancer(true));
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, compose(...enhancers));

export const persistor = persistStore(store);

if (__DEV__ && Reactotron.setReduxStore) {
  Reactotron.setReduxStore(store);
}

// KEYRING STORAGE

export const keyringStorage = {
  get: async key => {
    return AsyncStorage.getItem(KEYRING_STORAGE_KEY)
      .then(async value => {
        if (!value) {
          const oldState = {};
          await Promise.all(
            KEYRING_KEYS_IN_STORAGE.map(async k => {
              const flattedValue = await AsyncStorage.getItem(k);
              oldState[k] = flattedValue
                ? Flatted.parse(flattedValue)
                : undefined;
            })
          );
          await AsyncStorage.setItem(
            KEYRING_STORAGE_KEY,
            JSON.stringify(oldState)
          );
          return oldState;
        }
        return value ? JSON.parse(value) : value;
      })
      .then(parsedValue => {
        return parsedValue && key ? parsedValue[key] : parsedValue;
      });
  },
  set: values => {
    return AsyncStorage.getItem(KEYRING_STORAGE_KEY)
      .then(savedValues => (savedValues ? JSON.parse(savedValues) : {}))
      .then(parsedValues => {
        return AsyncStorage.setItem(
          KEYRING_STORAGE_KEY,
          JSON.stringify({ ...parsedValues, ...values })
        );
      });
  },
  clear: () => AsyncStorage.removeItem(KEYRING_STORAGE_KEY),
};

export const walletConnectStorage = {
  get: async key => {
    return AsyncStorage.getItem(WALLETCONNECT_STORAGE_KEY)
      .then(value => (value ? JSON.parse(value) : value))
      .then(parsedValue => {
        return key && parsedValue ? parsedValue[key] : parsedValue;
      });
  },
  set: values => {
    return AsyncStorage.getItem(WALLETCONNECT_STORAGE_KEY)
      .then(savedValues => (savedValues ? JSON.parse(savedValues) : {}))
      .then(parsedValues => {
        return AsyncStorage.setItem(
          WALLETCONNECT_STORAGE_KEY,
          JSON.stringify({ ...parsedValues, ...values })
        );
      });
  },
  clear: () => AsyncStorage.removeItem(WALLETCONNECT_STORAGE_KEY),
};
