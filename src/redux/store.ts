import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AnyAction,
  combineReducers,
  configureStore,
  StoreEnhancer,
} from '@reduxjs/toolkit';
import Flatted from 'flatted';
import { createTransform, persistReducer, persistStore } from 'redux-persist';

import { KEYRING_STORAGE_KEY } from '@/constants/keyring';
import { WALLETCONNECT_STORAGE_KEY } from '@/constants/walletconnect';
import { IcpState, UserState } from '@/interfaces/redux';

import Reactotron from '../config/reactotron';
import AlertReducer from './slices/alert';
import IcpReducer from './slices/icp';
import KeyringReducer from './slices/keyring';
import UserReducer from './slices/user';
import WalletConnectReducer from './slices/walletconnect';
import { migrateData } from './utils';

// PERSIST
export const transformCircular = createTransform(
  inboundState => Flatted.stringify(inboundState),
  outboundState => Flatted.parse(outboundState)
);

const icpPersistConfig = {
  key: 'icp',
  storage: AsyncStorage,
};

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
  transforms: [transformCircular],
  whitelist: [
    'assets',
    'contacts',
    'transactions',
    'collections',
    'usingBiometrics',
    'biometricsAvailable',
    'connectedApps',
  ],
};

// REDUCER
const enhancers: StoreEnhancer[] = [];

if (__DEV__ && Reactotron?.createEnhancer) {
  enhancers.push(Reactotron.createEnhancer(true));
}

const rootReducer = combineReducers({
  keyring: KeyringReducer,
  icp: persistReducer<IcpState, AnyAction>(icpPersistConfig, IcpReducer),
  user: persistReducer<UserState, AnyAction>(userPersistConfig, UserReducer),
  walletconnect: WalletConnectReducer,
  alert: AlertReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  enhancers: enhancers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

if (__DEV__ && Reactotron.setReduxStore) {
  Reactotron.setReduxStore(store);
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// KEYRING STORAGE

export const keyringStorage = {
  get: async (key: string) => {
    return AsyncStorage.getItem(KEYRING_STORAGE_KEY)
      .then(async value => {
        if (!value) {
          const oldState = await migrateData();
          return oldState;
        }
        return value ? JSON.parse(value) : value;
      })
      .then(parsedValue => {
        return parsedValue && key ? parsedValue[key] : parsedValue;
      });
  },
  set: (values: any) => {
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
  isSupported: true,
};

export const walletConnectStorage = {
  get: async (key: string) => {
    return AsyncStorage.getItem(WALLETCONNECT_STORAGE_KEY)
      .then(value => (value ? JSON.parse(value) : value))
      .then(parsedValue => {
        return key && parsedValue ? parsedValue[key] : parsedValue;
      });
  },
  set: (values: any) => {
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
