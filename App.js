/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { Provider } from 'react-redux';

import { persistor, store } from './redux/configureStore';

import Routes from './routes/index';
import React from 'react';
import ErrorBoundary from './helpers/ErrorBoundary';
import { PersistGate } from 'redux-persist/integration/react';
import { Text } from 'react-native';

const App = () => {
  console.log('renderin app');
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>hello</Text>} persistor={persistor}>
        <ErrorBoundary>
          <Routes />
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  );
};

export default App;
