import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Routes from './src/navigation';
import { store } from './src/redux/configureStore';
import { initKeyring, setUnlocked } from './src/redux/slices/keyring';
import ErrorBoundary from './src/components/common/ErrorBoundary';
import persistStore from 'redux-persist/es/persistStore';
import SplashScreen from 'react-native-splash-screen';
// import './shim.js';

const PersistedApp = () => {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false);
  const init = () => {
    dispatch(initKeyring());

    setTimeout(() => {
      setIsReady(true);
      SplashScreen.hide();
    }, 5000);
  };

  return (
    <PersistGate
      loading={<Text>hello</Text>}
      persistor={persistStore(store, null, init)}>
      <ErrorBoundary>{isReady && <Routes />}</ErrorBoundary>
    </PersistGate>
  );
};

const App = () => {
  console.log('renderin app');
  return (
    <Provider store={store}>
      <PersistedApp />
    </Provider>
  );
};

export default App;
