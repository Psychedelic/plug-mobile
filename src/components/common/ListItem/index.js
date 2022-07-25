import React from 'react';
import { View } from 'react-native';

import Text from '../Text';
import styles from './styles';

function ListItem({ number, text }) {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{number}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

export default ListItem;
