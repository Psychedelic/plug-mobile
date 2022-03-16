import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron, { overlay } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

Reactotron.configure({ name: 'plugmobile' })
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
