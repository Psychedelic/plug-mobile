import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules } from 'react-native';
import Reactotron, { overlay } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

let scriptHostname;
if (__DEV__) {
  const scriptURL = NativeModules.SourceCode.scriptURL;
  scriptHostname = scriptURL.split('://')[1].split(':')[0];
}

Reactotron.configure({ name: 'plugmobile', host: scriptHostname })
  .setAsyncStorageHandler(AsyncStorage)
  .useReactNative()
  .use(reactotronRedux())
  .use(overlay())
  .connect();

console.tron = {
  log: Reactotron.logImportant,
  clear: Reactotron.clear,
  customCommand: Reactotron.onCustomCommand,
  display: Reactotron.display,
};

export default Reactotron;
