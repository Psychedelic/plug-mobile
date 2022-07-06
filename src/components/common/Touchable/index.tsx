import React from 'react';
import { StyleProp, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import scales from '@/utils/animationScales';
import haptics, { HapticFeedbackTypes } from '@/utils/haptics';

interface Props {
  children: React.ReactNode;
  onPress: () => void;
  onLongPress?: () => void;
  hapticType?: string;
  scale?: number;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Touchable = ({
  children,
  onPress = () => {},
  onLongPress = () => {},
  hapticType = HapticFeedbackTypes.impactLight,
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
