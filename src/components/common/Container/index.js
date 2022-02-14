import React from 'react';
import { View, StatusBar } from 'react-native';

import { withNotch } from '../../../constants/platform';

import styles from './styles';

const Container = ({ children, customStyle, outerContainerStyle }) => {
  return (
    <View style={[styles.container, customStyle]}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View style={[styles.outerContainer]} />
      <View
        style={[
          styles.content,
          withNotch && styles.notchContainer,
          outerContainerStyle,
        ]}>
        {children}
      </View>
    </View>
  );
};

export default Container;
