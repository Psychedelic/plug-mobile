import React from 'react';
import { View } from 'react-native';

import Text from '../Text';
import styles from './styles';

const EmptyState = ({ title, text, style, onTextPress }) => (
  <View style={[styles.container, style]}>
    <Text style={styles.emoji}>🤔</Text>
    <Text type="body2" style={styles.title}>
      {title}
    </Text>
    <Text
      type="caption"
      style={[styles.text, onTextPress && styles.link]}
      onPress={onTextPress}>
      {text}
    </Text>
  </View>
);

export default EmptyState;
