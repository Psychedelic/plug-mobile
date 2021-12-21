import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const EmptyState = ({ title, text }) => (
  <View style={styles.container}>
    <Text style={styles.emoji}>🤔</Text>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.text}>{text}</Text>
  </View>
);

export default EmptyState;
