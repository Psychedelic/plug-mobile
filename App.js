import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/configureStore';
import Routes from './src/navigation';
import React from 'react';
import ErrorBoundary from './src/components/common/ErrorBoundary';
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
