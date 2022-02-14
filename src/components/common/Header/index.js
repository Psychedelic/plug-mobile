import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../../constants/theme';

const Header = ({ left, center, right, style }) => (
  <View style={[styles.container, style]}>
    {left && <View style={styles.left}>{left}</View>}
    {center && <View style={styles.center}>{center}</View>}
    {right && <View style={styles.right}>{right}</View>}
  </View>
);

export default Header;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 74,
    justifyContent: 'center',
    width: '100%',
    backgroundColor: Colors.Black.Primary,
  },
  left: {
    position: 'absolute',
    left: 20,
  },
  center: {
    position: 'absolute',
    alignSelf: 'center',
  },
  right: {
    position: 'absolute',
    right: 20,
  },
});
