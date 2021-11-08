import React from 'react';
import { View, Text } from 'react-native';
import { Colors, FontStyles } from '../../../constants/theme';
import { StyleSheet } from 'react-native';

const Section = ({ title, children, style }) => (
  <View style={[styles.section, style]}>
    <Text style={FontStyles.Subtitle}>{title}</Text>
    <View style={styles.content}>{children}</View>
  </View>
);

export default Section;

const styles = StyleSheet.create({
  section: {
    borderTopColor: Colors.Gray.Primary,
    borderTopWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  content: {
    paddingTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
