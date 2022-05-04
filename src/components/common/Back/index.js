import { TouchableOpacity, Text } from 'react-native';
import React from 'react';

import Icon from '@icons';

import styles from './styles';

function Back({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon name="chevronLeft" />
      <Text style={styles.text}>Back</Text>
    </TouchableOpacity>
  );
}

export default Back;
