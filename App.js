import { AppState } from 'react-native';
import Config from 'react-native-config';
import codePush from 'react-native-code-push';
import React, { useEffect, useRef } from 'react';
import Reactotron from 'reactotron-react-native';
import SplashScreen from 'react-native-splash-screen';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider, useDispatch, useSelector } from 'react-redux';

import ErrorBoundary from './src/components/common/ErrorBoundary';
import { initKeyring } from './src/redux/slices/keyring';
import { persistor, store } from './src/redux/store';
import { isIos } from './src/constants/platform';
import Routes from './src/navigation';
import './reactotronConfig';

const PersistedApp = () => {
  const { instance } = useSelector(state => state.keyring);
  const appState = useRef(AppState.currentState);
  const dispatch = useDispatch();

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const checkUpdates = async () => {
    await codePush.sync({
      installMode: codePush.InstallMode.IMMEDIATE,
      deploymentKey: isIos
        ? Config.CODE_PUSH_IOS_DEPLOY_KEY
        : Config.CODE_PUSH_ANDROID_DEPLOY_KEY,
    });
  };

  const handleAppStateChange = nextAppState => {
    if (nextAppState === 'background') {
      checkUpdates();
    }

    if (appState.current !== nextAppState) {
      appState.current = nextAppState;
    }
  };

  useEffect(() => {
    if (instance) {
      SplashScreen.hide();
    } else {
      console.log('init');
      dispatch(initKeyring());
    }
  }, [instance]);

  return (
    <PersistGate loading={null} persistor={persistor}>
      <ErrorBoundary>{!!instance && <Routes />}</ErrorBoundary>
    </PersistGate>
  );
};

const App = () => (
  <Provider store={store}>
    <PersistedApp />
  </Provider>
);

export default codePush({
  checkfrecuency: codePush.CheckFrequency.MANUAL,
  deploymentKey: isIos
    ? Config.CODE_PUSH_IOS_DEPLOY_KEY
    : Config.CODE_PUSH_ANDROID_DEPLOY_KEY,
})(__DEV__ ? Reactotron.overlay(App) : App);
