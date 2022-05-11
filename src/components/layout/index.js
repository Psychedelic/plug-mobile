import React from 'react';
import { StatusBar, View } from 'react-native';

import { withNotch } from '@/constants/platform';

import styles from './styles';

// Layout JSX components

export const Separator = () => <View style={styles.separator} />;

export const Row = ({ align, justify, children, style }) => {
  return (
    <View
      style={[
        styles.row,
        { justifyContent: justify },
        { alignItems: align },
        style,
      ]}>
      {children}
    </View>
  );
};

export const Column = ({ align, justify, children, style }) => {
  return (
    <View
      style={[
        styles.column,
        { justifyContent: justify },
        { alignItems: align },
        style,
      ]}>
      {children}
    </View>
  );
};

export const Container = ({ children, customStyle }) => {
  return (
    <View style={[styles.container, customStyle]}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View style={styles.outerContainer} />
      <View style={[styles.content, withNotch && styles.notchContainer]}>
        {children}
      </View>
    </View>
  );
};
