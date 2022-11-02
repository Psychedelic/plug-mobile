import React, { useEffect, useState } from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Text, Touchable } from '@/components/common';
import AddGradient from '@/icons/svg/AddGradient.svg';

import styles from './styles';

interface Props {
  onPress: () => void;
  text: string;
  buttonStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  scrollPosition: number;
}

function ScrollableButton({
  onPress,
  text,
  textStyle,
  buttonStyle,
  imageStyle,
  scrollPosition,
}: Props) {
  const [showFullButton, setShowFullButton] = useState(true);
  const [currentScrollPosition, setCurrentScrollPosition] = useState(0);
  const [textWidth, setTextWidth] = useState<number>();

  const animatedWidth = useSharedValue(0);

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

  const handleOnLayout = (event: LayoutChangeEvent) => {
    const width = event?.nativeEvent?.layout?.width;
    if (!textWidth) {
      // Save initial text width
      setTextWidth(width);
      animatedWidth.value = width;
    }
  };

  useEffect(() => {
    if (currentScrollPosition < scrollPosition) {
      // Scroll down.
      setShowFullButton(false);
      animatedWidth.value = 0;
    } else if (scrollPosition < currentScrollPosition || scrollPosition === 0) {
      // Scroll up or start position.
      setShowFullButton(true);
      animatedWidth.value = textWidth || 0;
    }
    setCurrentScrollPosition(scrollPosition);
  }, [scrollPosition]);

  return (
    <Touchable onPress={onPress}>
      <View style={[styles.button, buttonStyle]}>
        <AddGradient width={18} height={18} style={imageStyle} />
        <Animated.Text
          ellipsizeMode="clip"
          numberOfLines={1}
          onLayout={handleOnLayout}
          style={[
            styles.text,
            animatedStyle,
            showFullButton && styles.marginText,
            textStyle,
          ]}>
          {text}
        </Animated.Text>
      </View>
    </Touchable>
  );
}

export default ScrollableButton;
