import '@/config/logs';
import '@/config/i18n';
import '@/config/reactotron';

import * as Sentry from '@sentry/react-native';
import React, { useEffect, useRef } from 'react';
import { AppState, StatusBar } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import codePush from 'react-native-code-push';
import Config from 'react-native-config';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Reactotron from 'reactotron-react-native';
import { PersistGate } from 'redux-persist/integration/react';

import ErrorBoundary from '@/commonComponents/ErrorBoundary';
import { isIos } from '@/constants/platform';
import Routes from '@/navigation';
import { initKeyring } from '@/redux/slices/keyring';
import { persistor, store } from '@/redux/store';
import { TopLevelNavigationRef } from '@/utils/navigation';

const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

Sentry.init({
  dsn: Config.SENTRY_DSN,
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
    const event = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      event.remove();
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
      RNBootSplash.hide({ fade: true });
    } else {
      dispatch(initKeyring());
    }
  }, [instance]);

  return (
    <PersistGate loading={null} persistor={persistor}>
      <ErrorBoundary>
        <SafeAreaProvider>
          <StatusBar barStyle="light-content" backgroundColor="black" />
          {!!instance && (
            <Routes
              routingInstrumentation={routingInstrumentation}
              ref={TopLevelNavigationRef}
            />
          )}
        </SafeAreaProvider>
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
