import React from 'react';
import { View } from 'react-native';

import GradientText from '@/commonComponents/GradientText';
import Touchable from '@/commonComponents/Touchable';

import styles from './styles';

function ActionButton({ image, text, colors, onPress, disabled }) {
  return (
    <Touchable disabled={disabled} onPress={onPress}>
      <View style={[styles.button, disabled && styles.disabled]}>
        {image}
        <GradientText colors={colors} style={styles.text}>
          {text}
        </GradientText>
      </View>
    </Touchable>
  );
}

export default ActionButton;
