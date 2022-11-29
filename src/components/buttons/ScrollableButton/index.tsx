import React, { useEffect, useState } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Touchable } from '@/components/common';
import AddGradient from '@/icons/svg/AddGradient.svg';

import styles from './styles';

interface Props {
  onPress: () => void;
  text: string;
  textWidth: number;
  buttonStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  scrollPosition: number;
}

function ScrollableButton({
  onPress,
  text,
  textWidth,
  textStyle,
  buttonStyle,
  imageStyle,
  scrollPosition,
}: Props) {
  const [showFullButton, setShowFullButton] = useState(true);
  const [currentScrollPosition, setCurrentScrollPosition] = useState(0);

  const animatedWidth = useSharedValue(textWidth);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(animatedWidth.value, {
        duration: 200,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
      opacity: withTiming(animatedWidth.value > 0 ? 1 : 0, {
        duration: 450,
      }),
    };
  });

  useEffect(() => {
    if (scrollPosition < 0) {
      // to capture ios bounce effect
      setShowFullButton(true);
      animatedWidth.value = textWidth;
      setCurrentScrollPosition(0);
    } else if (Math.abs(scrollPosition - currentScrollPosition) > 100) {
      if (currentScrollPosition < scrollPosition) {
        // Scroll down.
        setShowFullButton(false);
        animatedWidth.value = 0;
      } else if (
        scrollPosition < currentScrollPosition ||
        scrollPosition === 0
      ) {
        // Scroll up or start position.
        setShowFullButton(true);
        animatedWidth.value = textWidth;
      }
      setCurrentScrollPosition(scrollPosition);
    }
  }, [scrollPosition]);

  return (
    <Touchable onPress={onPress} style={[styles.button, buttonStyle]}>
      <AddGradient width={18} height={18} style={imageStyle} />
      <Animated.Text
        ellipsizeMode="clip"
        numberOfLines={1}
        style={[
          styles.text,
          animatedStyle,
          showFullButton && styles.marginText,
          textStyle,
        ]}>
        {text}
      </Animated.Text>
    </Touchable>
  );
}

export default ScrollableButton;
