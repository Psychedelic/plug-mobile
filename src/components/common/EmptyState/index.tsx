import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import Text from '../Text';
import styles from './styles';

interface Props {
  title: string;
  description: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const EmptyState = ({ title, description, style, onPress }: Props) => (
  <View style={[styles.container, style]}>
    <Text style={styles.emoji}>🤔</Text>
    <Text type="body2" style={styles.title}>
      {title}
    </Text>
    <Text
      type="caption"
      style={[styles.text, onPress && styles.link]}
      onPress={onPress}>
      {description}
    </Text>
  </View>
);

export default EmptyState;
