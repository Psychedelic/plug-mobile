import React from 'react';
import { View } from 'react-native';

import GradientText from '../../../../components/common/GradientText';
import Touchable from '../../../../components/animations/Touchable';
import styles from './styles';

const ActionButton = ({ image, text, colors, onPress, disabled }) => (
  <Touchable disabled={disabled} onPress={onPress}>
    <View style={[styles.button, disabled && styles.disabled]}>
      {image}
      <GradientText colors={colors} style={styles.text}>
        {text}
      </GradientText>
    </View>
  </Touchable>
);

export default ActionButton;
