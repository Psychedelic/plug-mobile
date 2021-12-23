import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { persistReducer, persistStore, createTransform } from 'redux-persist';
import thunk from 'redux-thunk';
import Flatted from 'flatted';

import KeyringReducer from './slices/keyring';
import IcpReducer from './slices/icp';

export const transformCircular = createTransform(
  (inboundState, key) => Flatted.stringify(inboundState),
  (outboundState, key) => Flatted.parse(outboundState),
);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [transformCircular],
};
const keyringPersistConfig = {
  key: 'keyring',
  storage: AsyncStorage,
  blacklist: 'instance',
  transforms: [transformCircular],
};

const rootReducer = combineReducers({
  keyring: persistReducer(keyringPersistConfig, KeyringReducer),
  icp: persistReducer(
    {
      key: 'icp',
      storage: AsyncStorage,
    },
    IcpReducer,
  ),
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = onInit => persistStore(store, null, onInit);

export const keyringStorage = {
  get: async key => {
    const state = {};
     //await AsyncStorage.clear();
    if (key) {
      return AsyncStorage.getItem(key).then(value => JSON.parse(value));
    } else {
      const allKeys = await AsyncStorage.getAllKeys();
      await Promise.all(
        allKeys.map(async k => {
          const val = await AsyncStorage.getItem(k);
          state[k] = JSON.parse(val)[0];
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
