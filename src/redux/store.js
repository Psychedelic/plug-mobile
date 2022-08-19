import AsyncStorage from '@react-native-async-storage/async-storage';
import Flatted from 'flatted';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createTransform, persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import Reactotron from '../config/reactotron';
import IcpReducer from './slices/icp';
import KeyringReducer from './slices/keyring';
import UserReducer from './slices/user';
import WalletConnectReducer from './slices/walletconnect';

// CONSTANT

export const WALLETCONNECTKEY = 'WALLETCONNECT';

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
const keyToLog = ['currentWalletId', 'isInitialized', 'isUnlocked'];

export const keyringStorage = {
  get: async key => {
    const state = {};
    const isUnflatted = await AsyncStorage.getItem('unflatted');
    if (!isUnflatted) {
      const allKeys = await AsyncStorage.getAllKeys();
      await Promise.all(
        allKeys.map(async k => {
          if (!k.includes('@REACTOTRON') && !k.includes('WALLETCONNECT')) {
            const val = await AsyncStorage.getItem(k);
            if (JSON.parse(val)[0]) {
              console.log(`${k} value is undefined`);
            }
            const unflattedVal = JSON.parse(val)[0] || JSON.parse(`${val}`);
            await AsyncStorage.setItem(k, JSON.stringify(unflattedVal));
            console.log(
              `${k} UNFLATTED`,
              keyToLog.includes(k)
                ? `${val} => ${JSON.stringify(unflattedVal)} SAVED: ${await AsyncStorage.getItem(k)}`
                : 'unflattedVal'
            );
          }
        })
      );
      await AsyncStorage.setItem('unflatted', 'true');
    }
    if (key) {
      return AsyncStorage.getItem(key).then(value => JSON.parse(`${value}`));
    } else {
      const allKeys = await AsyncStorage.getAllKeys();
      await Promise.all(
        allKeys.map(async k => {
          if (!k.includes('@REACTOTRON') && !k.includes('WALLETCONNECT')) {
            const val = await AsyncStorage.getItem(k);
            state[k] = JSON.parse(val);
          }
        })
      );
      return state;
    }
  },
  set: async values =>
    Promise.all(
      Object.entries(values).map(async ([key, val]) => {
        console.log('SETTING');
        await AsyncStorage.setItem(key, JSON.stringify(val));
      })
    ),
  clear: AsyncStorage.clear,
};

export const walletConnectStorage = {
  get: async key => {
    return AsyncStorage.getItem(WALLETCONNECTKEY)
      .then(value => (value ? Flatted.parse(value) : value))
      .then(parsedValue => {
        return key && parsedValue ? parsedValue[key] : parsedValue;
      });
  },
  set: values => {
    return AsyncStorage.getItem(WALLETCONNECTKEY)
      .then(savedValues => (savedValues ? Flatted.parse(savedValues) : {}))
      .then(parsedValues => {
        return AsyncStorage.setItem(
          WALLETCONNECTKEY,
          Flatted.stringify({ ...parsedValues, ...values })
        );
      });
  },
  clear: () =>
    AsyncStorage.setItem(WALLETCONNECTKEY, Flatted.stringify(undefined)),
};
