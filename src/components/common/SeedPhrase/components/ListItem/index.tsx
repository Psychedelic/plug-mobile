import React from 'react';
import { View } from 'react-native';

import { Text } from '@/components/common';

import styles from './styles';

interface Props {
  number: number;
  text: string;
}

function ListItem({ number, text }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{number}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

export default ListItem;
