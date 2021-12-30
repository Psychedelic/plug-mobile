import { Text } from 'react-native';
import React, { useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { PersistGate } from 'redux-persist/integration/react';

import ErrorBoundary from './src/components/common/ErrorBoundary';
import { persistor, store } from './src/redux/configureReducer';
import { initKeyring } from './src/redux/slices/keyring';
import Routes from './src/navigation';

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

const App = () => (
  <Provider store={store}>
    <PersistedApp />
  </Provider>
);

if (__DEV__) {
  import('./reactotronConfig');
}

export default App;
