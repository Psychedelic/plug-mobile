import React from 'react';
import { View } from 'react-native';

import styles from './styles';

interface Props {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

const Header = ({ left, center, right }: Props) => (
  <View style={styles.container}>
    {left && <View style={styles.left}>{left}</View>}
    {center && <View style={styles.center}>{center}</View>}
    {right && <View style={styles.right}>{right}</View>}
  </View>
);

export default Header;
