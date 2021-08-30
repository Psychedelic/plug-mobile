import {createStore, applyMiddleware} from 'redux';
import {persistStore} from 'redux-persist';
import thunk from 'redux-thunk';

import createRootReducer from './configureReducer';

const middlewares = [thunk];

export const store = createStore(
  createRootReducer,
  applyMiddleware(...middlewares),
);
export const persistor = persistStore(store);
