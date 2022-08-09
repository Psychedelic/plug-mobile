import React from 'react';
import { TouchableOpacity } from 'react-native';

import Text from '../Text';
import styles from './styles';

interface Props {
  onPress: () => void;
  label: string;
}

function ActionButton({ onPress, label }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.5}>
      <Text type="body1" style={styles.text}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default ActionButton;
