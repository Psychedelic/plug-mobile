import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Routes from './src/navigation';
import { store } from './src/redux/configureStore';
import { initKeyring } from './src/redux/slices/keyring';
import ErrorBoundary from './src/components/common/ErrorBoundary';
import persistStore from 'redux-persist/es/persistStore';
import SplashScreen from 'react-native-splash-screen'

const PersistedApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initKeyring());

    setTimeout(() => {
      SplashScreen.hide();
    }, 1000)

  }, [dispatch]);
  return (
    <PersistGate loading={<Text>hello</Text>} persistor={persistStore(store)}>
      <ErrorBoundary>
        <Routes />
      </ErrorBoundary>
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
