import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontStyles } from '../../../constants/theme';
import Icon from '../../icons';

const Back = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Icon name="chevronLeft" />
    <Text style={styles.text}>Back</Text>
  </TouchableOpacity>
);

export default Back;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    ...FontStyles.LinkButton,
    fontSize: 17,
    marginLeft: 5,
  },
});
