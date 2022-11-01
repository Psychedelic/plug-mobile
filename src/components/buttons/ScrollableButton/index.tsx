import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { Touchable } from '@/components/common';
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
  const [animationFinished, setAnimationFinished] = useState(true);
  const [currentScrollPosition, setCurrentScrollPosition] = useState(0);
  const [textWidth, setTextWidth] = useState<number>();
  const textAnim = useRef(new Animated.Value(textWidth || 0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handleOnLayout = (event: LayoutChangeEvent) => {
    const width = event?.nativeEvent?.layout?.width;
    if (!textWidth) {
      setTextWidth(width);
      textAnim.setValue(width);
    }
  };

  useEffect(() => {
    if (currentScrollPosition < scrollPosition) {
      // Scroll down.
      setShowFullButton(false);
      if (animationFinished) {
        setAnimationFinished(false);
        hideAnimation.start(({ finished }: Animated.EndResult) => {
          if (finished) {
            setAnimationFinished(true);
          }
        });
      }
    } else if (scrollPosition < currentScrollPosition || scrollPosition === 0) {
      // Scroll up or start position.
      setShowFullButton(true);
      if (animationFinished) {
        setAnimationFinished(false);
        showAnimation.start(({ finished }: Animated.EndResult) => {
          if (finished) {
            setAnimationFinished(true);
          }
        });
      }
    }
    setCurrentScrollPosition(scrollPosition);
  }, [scrollPosition]);

  const hideAnimation = Animated.parallel([
    Animated.timing(textAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }),
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 10,
      useNativeDriver: false,
    }),
  ]);

  const showAnimation = Animated.parallel([
    Animated.timing(textAnim, {
      toValue: textWidth!,
      duration: 100,
      useNativeDriver: false,
    }),
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 10,
      useNativeDriver: false,
    }),
  ]);

  return (
    <Touchable onPress={onPress}>
      <View
        style={[
          styles.button,
          !showFullButton && styles.smallButton,
          buttonStyle,
        ]}>
        <AddGradient width={30} height={30} style={imageStyle} />
        <Animated.Text
          ellipsizeMode="clip"
          numberOfLines={1}
          onLayout={handleOnLayout}
          style={[
            styles.text,
            !!textWidth && { width: textAnim, opacity: opacityAnim },
            textStyle,
          ]}>
          {text}
        </Animated.Text>
      </View>
    </Touchable>
  );
}

export default ScrollableButton;
