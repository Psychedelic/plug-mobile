import React from 'react';
import { View } from 'react-native';

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
