import React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';

import { FontStyles } from '@/constants/theme';

import styles from './styles';

interface Props {
  title: string;
  children: React.ReactNode;
  style: StyleProp<ViewStyle>;
}

const Section = ({ title, children, style }: Props) => (
  <View style={[styles.section, style]}>
    <Text style={FontStyles.Subtitle}>{title}</Text>
    <View style={styles.content}>{children}</View>
  </View>
);

export default Section;
