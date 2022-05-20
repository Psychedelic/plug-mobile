import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container, customStyle]}>
      <View style={styles.outerContainer} />
      <View style={[styles.content, { marginTop: top }]}>{children}</View>
    </View>
  );
};
