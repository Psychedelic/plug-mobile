import React from 'react';
import { View } from 'react-native';

import Text from '../Text';
import styles from './styles';

const EmptyState = ({ title, text, style }) => (
  <View style={[styles.container, style]}>
    <Text style={styles.emoji}>🤔</Text>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.text}>{text}</Text>
  </View>
);

export default EmptyState;
