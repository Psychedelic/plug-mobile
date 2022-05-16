import React from 'react';
import { Text, View } from 'react-native';

import { FontStyles } from '@/constants/theme';

import styles from './styles';

const Section = ({ title, children, style }) => (
  <View style={[styles.section, style]}>
    <Text style={FontStyles.Subtitle}>{title}</Text>
    <View style={styles.content}>{children}</View>
  </View>
);

export default Section;
