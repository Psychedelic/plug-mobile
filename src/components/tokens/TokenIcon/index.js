import React from 'react';
import { View, Text } from 'react-native';

import Icon from '@icons';

import styles from './styles';

const TokenIcon = ({ icon, symbol, color, customStyle, ...props }) => {
  return icon ? (
    <Icon name={icon} color={color} />
  ) : (
    <View
      style={[styles.genericToken, customStyle, styles.blackBackground]}
      {...props}>
      <Text style={styles.text}>{symbol}</Text>
    </View>
  );
};

export default TokenIcon;
