import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import styles from './styles';

interface Props {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Header = ({ left, center, right, style }: Props) => (
  <View style={[styles.container, style]}>
    {left && <View style={styles.left}>{left}</View>}
    {center && <View style={styles.center}>{center}</View>}
    {right && <View style={styles.right}>{right}</View>}
  </View>
);

export default Header;
