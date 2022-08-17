import React from 'react';
import { TouchableOpacity } from 'react-native';

import Text, { TextTypes } from '../Text';
import styles from './styles';

interface Props {
  onPress: () => void;
  label: string;
  type?: TextTypes;
}

function ActionButton({ onPress, label, type = 'body1' }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.5}>
      <Text type={type} style={styles.text}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default ActionButton;
