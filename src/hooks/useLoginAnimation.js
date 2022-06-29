import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Keyboard } from 'react-native';

import { IS_MEDIUM_DEVICE, isIos, refRatioScale } from '@/constants/platform';

const useLoginAnimation = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const loginAnimation = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.timing(loginAnimation, {
      toValue: 1,
      duration: 180,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  };

  const reverseAnimation = () => {
    Animated.timing(loginAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      startAnimation();
      setIsKeyboardOpen(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      reverseAnimation();
      setIsKeyboardOpen(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const animatedLogoStyle = {
    transform: [
      {
        translateX: loginAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -refRatioScale(145)],
        }),
      },
      {
        translateY: loginAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -refRatioScale(isIos ? 10 : 20)],
        }),
      },
      {
        scaleX: loginAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.5],
        }),
      },
      {
        scaleY: loginAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.5],
        }),
      },
    ],
  };

  const animatedTitleStyle = {
    transform: [
      {
        translateY: loginAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [
            0,
            -refRatioScale(IS_MEDIUM_DEVICE ? 110 : isIos ? 70 : 100),
          ],
        }),
      },
    ],
  };

  const animatedFaceIDStyle = {
    transform: [
      {
        translateY: loginAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [
            0,
            -refRatioScale(IS_MEDIUM_DEVICE ? 180 : isIos ? 125 : 160),
          ],
        }),
      },
    ],
    opacity: loginAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  };

  return {
    animatedLogoStyle,
    animatedTitleStyle,
    animatedFaceIDStyle,
    isKeyboardOpen,
  };
};

export default useLoginAnimation;
