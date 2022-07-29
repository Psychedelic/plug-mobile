import { useEffect } from 'react';
import { BackHandler } from 'react-native';

/**
 * Disables the hardware back button.
 * Disclaimer: You can still goBack() using swipes, so if you want to compleatly block it,
 *  you should set `options={{ gestureEnabled: false }}` in navigationOptions.
 */
function useDisableBack() {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true
    );

    return () => {
      backHandler.remove();
    };
  }, []);
}

export default useDisableBack;
