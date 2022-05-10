import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { persistReducer, persistStore, createTransform } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import Flatted from 'flatted';

import Reactotron from '../config/reactotron';
import KeyringReducer from './slices/keyring';
import UserReducer from './slices/user';
import IcpReducer from './slices/icp';

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

// REDUCER

const rootReducer = combineReducers({
  keyring: KeyringReducer,
  icp: persistReducer(icpPersistConfig, IcpReducer),
  user: persistReducer(userPersistConfig, UserReducer),
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
    if (key) {
      return AsyncStorage.getItem(key).then(value => JSON.parse(`${value}`));
    } else {
      const allKeys = await AsyncStorage.getAllKeys();
      await Promise.all(
        allKeys.map(async k => {
          if (!k.includes('@REACTOTRON')) {
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
