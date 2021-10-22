import React from 'react';
import { View, Text } from 'react-native';
import { Colors } from '../../../constants/theme';

const Section = ({ title, children, style }) => (
  <View style={[styles.section, style]}>
    <Text>{title}</Text>
    <View style={styles.content}>
      {children}
    </View>
  </View>
);

export default Section;

const styles = StyleSheet.create({
  section: {
    borderBottomColor: Colors.Gray.Primary,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  content: {
    paddingTop: 20,
  }
});
