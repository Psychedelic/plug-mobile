import React from 'react';
import { View, StatusBar } from 'react-native';
import { hasNotch } from 'react-native-device-info';

import styles from './styles';

const Container = ({ children, customStyle }) => {
  return (
    <View style={[styles.container, customStyle]}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View style={styles.outerContainer} />
      <View style={[styles.content, hasNotch() && styles.notchContainer]}>
        {children}
      </View>
    </View>
  );
};

export default Container;
