import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { persistReducer, persistStore, createTransform } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import Flatted from 'flatted';

import Reactotron from '../../reactotronConfig';
import KeyringReducer from './slices/keyring';
import UserReducer from './slices/user';
import IcpReducer from './slices/icp';
import WalletConnectReducer from './slices/walletconnect';

// CONSTANT

export const WALLETCONNECTKEY = 'WALLETCONNECT';

// PERSIST
export const transformCircular = createTransform(
  inboundState => Flatted.stringify(inboundState),
  outboundState => Flatted.parse(outboundState),
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

const walletConnectPersistConfig = {
  key: 'walletconnect',
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
    const state = {};
    // await AsyncStorage.clear();
    if (key) {
      return AsyncStorage.getItem(key).then(value => JSON.parse(`${value}`));
    } else {
      const allKeys = await AsyncStorage.getAllKeys();
      await Promise.all(
        allKeys.map(async k => {
          if (!k.includes('@REACTOTRON') && !k.includes('WALLETCONNECT')) {
            const val = await AsyncStorage.getItem(k);
            state[k] = JSON.parse(val)[0];
          }
        }),
      );
      return state;
    }
  },
  set: async values =>
    Promise.all(
      Object.entries(values).map(async ([key, val]) => {
        await AsyncStorage.setItem(key, Flatted.stringify(val));
      }),
    ),
  clear: AsyncStorage.clear,
};

export const walletConnectStorage = {
  get: async key => {
    // await AsyncStorage.clear();
    if (key) {
      return AsyncStorage.getItem(WALLETCONNECTKEY)
        .then(value => JSON.parse(`${value}`))
        .then(parsedValue => parsedValue[key])
        .then(value => (value ? JSON.parse(value) : value));
    }
    return AsyncStorage.getItem(WALLETCONNECTKEY).then(value =>
      value ? JSON.parse(value) : value,
    );
  },
  set: values =>
    AsyncStorage.getItem(WALLETCONNECTKEY)
      .then(savedValues => (savedValues ? JSON.parse(savedValues) : {}))
      .then(parsedValues =>
        AsyncStorage.setItem(
          WALLETCONNECTKEY,
          Flatted.stringify({ ...parsedValues, values }),
        ),
      ),
  clear: AsyncStorage.setItem(WALLETCONNECTKEY, Flatted.stringify({})),
};
