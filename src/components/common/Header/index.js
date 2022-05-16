import React from 'react';
import { View } from 'react-native';

import styles from './styles';

const Header = ({ left, center, right }) => (
  <View style={styles.container}>
    {left && <View style={styles.left}>{left}</View>}
    {center && <View style={styles.center}>{center}</View>}
    {right && <View style={styles.right}>{right}</View>}
  </View>
);

export default Header;
