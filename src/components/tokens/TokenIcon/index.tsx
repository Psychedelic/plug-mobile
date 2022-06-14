import React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';

import Icon from '@/icons';

import styles from './styles';

interface Props {
  symbol: string;
  icon?: string;
  customStyle?: StyleProp<ViewStyle>;
  color?: string;
}

const TokenIcon = ({ icon, symbol, color, customStyle, ...props }: Props) => {
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
