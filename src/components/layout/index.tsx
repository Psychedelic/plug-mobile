import React from 'react';
import { FlexStyle, StyleProp, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import styles from './styles';

// Layout JSX components

export const Separator = () => <View style={styles.separator} />;

interface Props {
  children: React.ReactNode;
  align?: FlexStyle['alignItems'];
  justify?: FlexStyle['justifyContent'];
  style?: StyleProp<ViewStyle>;
}

interface ContainerProps {
  children: React.ReactNode;
  customStyle?: StyleProp<ViewStyle>;
}

export const Row = ({ align, justify, children, style }: Props) => {
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

export const Column = ({ align, justify, children, style }: Props) => {
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

export const Container = ({ children, customStyle }: ContainerProps) => {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container, customStyle]}>
      <View style={styles.outerContainer} />
      <View style={[styles.content, top > 0 && { marginTop: top }]}>
        {children}
      </View>
    </View>
  );
};
