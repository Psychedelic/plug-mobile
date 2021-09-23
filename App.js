import React from 'react';
import { Text } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Routes from './src/navigation';
import { persistor, store } from './src/redux/configureStore';
import { initKeyring } from './src/redux/slices/keyring';
import ErrorBoundary from './src/components/common/ErrorBoundary';

const PersistedApp = () => {
  const dispatch = useDispatch();
  const init = () => dispatch(initKeyring());
  return (
    <PersistGate loading={<Text>hello</Text>} persistor={persistor({}, init)}>
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
