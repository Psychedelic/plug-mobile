import { AppState } from 'react-native';
import { Platform } from 'react-native';
import Config from 'react-native-config';
import codePush from 'react-native-code-push';
import * as Sentry from '@sentry/react-native';
import React, { useEffect, useRef } from 'react';
import Reactotron from 'reactotron-react-native';
import SplashScreen from 'react-native-splash-screen';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import {
  getBundleId,
  getVersion,
  getBuildNumber,
} from 'react-native-device-info';

import ErrorBoundary from './src/components/common/ErrorBoundary';
import { initKeyring } from './src/redux/slices/keyring';
import { persistor, store } from './src/redux/store';
import { isIos } from './src/constants/platform';
import Routes from './src/navigation';
import './reactotronConfig';

const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();
const baseDist = getBuildNumber();
const baseRelease = `${getBundleId()}@${getVersion()}:${Platform.OS}`;

Sentry.init({
  tracesSampleRate: 1.0,
  dist: baseDist,
  release: baseRelease,
  environment: __DEV__ ? 'local' : 'productive',
  maxBreadcrumbs: 100,
  normalizeDepth: 10,
  enableOutOfMemoryTracking: false,
  integrations: [
    new Sentry.ReactNativeTracing({
      routingInstrumentation,
    }),
  ],
});

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
      <ErrorBoundary>
        {!!instance && (
          <Routes routingInstrumentation={routingInstrumentation} />
        )}
      </ErrorBoundary>
    </PersistGate>
  );
};

const App = () => (
  <Provider store={store}>
    <PersistedApp />
  </Provider>
);

const AppWithSentry = Sentry.wrap(__DEV__ ? Reactotron.overlay(App) : App);

export default codePush({
  checkfrecuency: codePush.CheckFrequency.MANUAL,
  deploymentKey: isIos
    ? Config.CODE_PUSH_IOS_DEPLOY_KEY
    : Config.CODE_PUSH_ANDROID_DEPLOY_KEY,
})(AppWithSentry);
