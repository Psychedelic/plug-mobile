import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import Text from '@/components/common/Text';

import styles from './styles';

interface Props {
  title: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Section = ({ title, children, style }: Props) => (
  <View style={[styles.section, style]}>
    <Text type="subtitle1">{title}</Text>
    <View style={styles.content}>{children}</View>
  </View>
);

export default Section;
