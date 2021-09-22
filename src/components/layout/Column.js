import React from 'react';
import { View } from 'react-native';
import styles from './styles';

const Column = ({ align, justify, children, style }) => {
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

export default Column;
