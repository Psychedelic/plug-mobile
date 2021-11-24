import React, { useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Keyboard, Text, TouchableWithoutFeedback } from 'react-native';

import Routes from './src/navigation';
import { persistor, store } from './src/redux/configureReducer';
import { initKeyring } from './src/redux/slices/keyring';
import ErrorBoundary from './src/components/common/ErrorBoundary';

import SplashScreen from 'react-native-splash-screen';
import KeyboardHider from './src/components/common/KeyboardHider';
// import './shim.js';

const PersistedApp = () => {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false);
  const init = () => {
    console.log('init');
    dispatch(initKeyring());

    setTimeout(() => {
      setIsReady(true);
      SplashScreen.hide();
    }, 5000);
  };

  return (
    <PersistGate loading={<Text>hello</Text>} persistor={persistor(init)}>
      <ErrorBoundary>{isReady && <Routes />}</ErrorBoundary>
    </PersistGate>
  );
};

const App = () => {
  console.log('renderin app');
  return (
    <KeyboardHider>
      <Provider store={store}>
        <PersistedApp />
      </Provider>
    </KeyboardHider>
  );
};

export default App;
