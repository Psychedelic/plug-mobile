import React from 'react';
import {
  Insets,
  StyleProp,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import scales from '@/utils/animationScales';

interface Props {
  children?: React.ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
  hapticType?: HapticFeedbackTypes;
  scale?: number;
  disabled?: boolean;
  hitSlop?: Insets;
  style?: StyleProp<ViewStyle>;
}

const Touchable = ({
  children,
  onPress = () => {},
  onLongPress = () => {},
  hapticType = 'impactLight',
  scale = scales.small,
  disabled = false,
  style,
  ...props
}: Props) => {
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
    trigger?.(hapticType);
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
