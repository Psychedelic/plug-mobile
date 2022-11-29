import { t } from 'i18next';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleProp, View, ViewStyle } from 'react-native';

import { Text } from '@/components/common';
import { FontStyles } from '@/constants/theme';

import styles from './styles';

const TOAST_DURATION = 2500;
const TOAST_ANIMATION_SPEED = 200;

interface Props {
  visibility: boolean;
  setVisibility: (value: boolean) => void;
  customStyle?: StyleProp<ViewStyle>;
  customPointerStyle?: StyleProp<ViewStyle>;
}

function CopiedToast({
  visibility,
  setVisibility,
  customStyle,
  customPointerStyle,
}: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visibility) {
      startAnimation();
    }
  }, [visibility]);

  const startAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: TOAST_ANIMATION_SPEED,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: TOAST_ANIMATION_SPEED,
          useNativeDriver: false,
        }).start(({ finished }) => {
          if (finished) {
            setVisibility(false);
          }
        });
      }, TOAST_DURATION);
    });
  };

  return visibility ? (
    <Animated.View
      style={[styles.animationContainer, customStyle, { opacity: fadeAnim }]}>
      <View style={[styles.pointer, customPointerStyle]} />
      <Text style={[FontStyles.Small, styles.text]}>{t('common.copied')}</Text>
    </Animated.View>
  ) : null;
}

export default CopiedToast;
