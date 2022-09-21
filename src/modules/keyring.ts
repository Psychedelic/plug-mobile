import PlugController from '@psychedelic/plug-controller';
import PlugKeyRing from '@psychedelic/plug-controller/dist/PlugKeyRing';
import RNCryptoJS from 'react-native-crypto-js';
import { fetch } from 'react-native-fetch-api';

import { keyringStorage } from '@/redux/store';

class KeyRing extends PlugKeyRing {
  private static instance: KeyRing;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    super();
    return new PlugController.PlugKeyRing(keyringStorage, RNCryptoJS, fetch);
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): KeyRing {
    if (!KeyRing.instance) {
      KeyRing.instance = new KeyRing();
    }

    return KeyRing.instance;
  }

  public static reset() {
    KeyRing.instance = new KeyRing();
  }
}
export default KeyRing;
