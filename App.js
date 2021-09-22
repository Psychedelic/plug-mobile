import React from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Routes from './src/navigation';
import { persistor, store } from './src/redux/configureStore';
import ErrorBoundary from './src/components/common/ErrorBoundary';

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
