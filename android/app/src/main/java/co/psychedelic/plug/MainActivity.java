package co.psychedelic.plug;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
import com.facebook.react.ReactActivityDelegate;
import com.zoontek.rnbootsplash.RNBootSplash;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Plug";
  }

  /**
  * Needed for react-native-screens to work well
  * https://github.com/software-mansion/react-native-screens#android
  */
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(null);
  }

  /**
  * Needed for react-native-bootsplash
  */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {

      @Override
      protected void loadApp(String appKey) {
        RNBootSplash.init(MainActivity.this);
        super.loadApp(appKey);
      }
    };
  }

}
