import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import haptics, { HapticFeedbackTypes } from '@utils/haptics';
import scales from '@utils/animationScales';

const Touchable = ({
  children,
  onPress = () => null,
  onLongPress = () => null,
  hapticType = HapticFeedbackTypes.impactLight,
  scale = scales.small,
  disabled = false,
  style,
  ...props
}) => {
  const pressed = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(pressed.value ? scale : 1, {
            duration: 100,
          }),
        },
      ],
    };
  });

  const handlePress = () => {
    haptics[hapticType]();
    onPress();
  };

  const handleLongPress = () => {
    pressed.value = false;
    onLongPress();
  };

  const handleOnPressIn = () => {
    if (!disabled) {
      pressed.value = true;
    }
  };

  const handleOnPressOut = () => {
    pressed.value = false;
  };

  return (
    <TouchableWithoutFeedback
      onPress={handlePress}
      onPressIn={handleOnPressIn}
      onPressOut={handleOnPressOut}
      onLongPress={handleLongPress}
      disabled={disabled}
      {...props}>
      <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default Touchable;
