import AsyncStorage from '@react-native-async-storage/async-storage';
import { reactotronRedux } from 'reactotron-redux';
import Reactotron from 'reactotron-react-native';

export default Reactotron.configure({ name: 'plugmobile' })
  .setAsyncStorageHandler(AsyncStorage)
  .useReactNative()
  .use(reactotronRedux())
  .connect();
