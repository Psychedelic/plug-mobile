import React from 'react';
import { View } from 'react-native';
import styles from './styles';

const Row = ({ align, justify, children, style }) => {
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

export default Row;
