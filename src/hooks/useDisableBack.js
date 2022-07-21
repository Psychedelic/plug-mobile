import { useEffect } from 'react';
import { BackHandler } from 'react-native';

/**
 * Disables the hardware back button.
 * Disclaimer: You can still goBack() using swipes, so if you want to compleatly block it,
 *  you should set `options={{ gestureEnabled: false }}` in navigationOptions.
 */
function useDisableBack() {
  useEffect(() => {
    const handleBackPress = () => {
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);
}

export default useDisableBack;
