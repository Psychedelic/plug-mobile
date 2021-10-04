import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

const ListItem = ({ number, text }) => (
  <View style={styles.container}>
    <Text style={styles.number}>{number}</Text>
    <Text style={styles.text}>{text}</Text>
  </View>
);

export default ListItem;
