import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import Image from '@/components/common/Image';
import Text from '@/components/common/Text';
import Icon from '@/icons';

import styles from './styles';

interface Props {
  symbol: string;
  icon?: string;
  customStyle?: StyleProp<ViewStyle>;
  color?: string;
  logo?: string;
}

const TokenIcon = ({
  icon,
  symbol,
  color,
  customStyle,
  logo,
  ...props
}: Props) => {
  return icon ? (
    <Icon name={icon} color={color} />
  ) : logo ? (
    <Image url={logo} style={styles.genericToken} />
  ) : (
    <View
      style={[styles.genericToken, customStyle, styles.blackBackground]}
      {...props}>
      <Text style={styles.text}>{symbol}</Text>
    </View>
  );
};

export default TokenIcon;
