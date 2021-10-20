import React from 'react';
import Touchable from '../../../../components/animations/Touchable';
import { View } from 'react-native';
import GradientText from '../../../../components/common/GradientText';
import styles from './styles';

const ActionButton = ({ image, text, colors, onPress }) => (
  <Touchable onPress={onPress}>
    <View style={styles.button}>
      {image}
      <GradientText colors={colors} style={styles.text}>
        {text}
      </GradientText>
    </View>
  </Touchable>
);

export default ActionButton;
