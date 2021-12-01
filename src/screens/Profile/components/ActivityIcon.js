import React from 'react';
import { StyleSheet, View } from 'react-native';

import Icon from '../../../components/icons';

import { ACTIVITY_IMAGES } from './constants';
import { parseImageName } from './utils';

const ActivityIcon = ({ image, type }) => (
  <View style={styles.root}>
    {type && (
      <Icon name={ACTIVITY_IMAGES[type] || 'lightingActivity'} style={styles.activity} />
    )}
    <Icon name={image ? parseImageName(image) : 'unknown'} />
  </View>
);

export default ActivityIcon;

const styles = StyleSheet.create({
  root: {
    height: 41,
    width: 41,
    borderRadius: 26,
    position: 'relative',
    marginRight: 12,
  },
  activity: {
    position: 'absolute',
    right: -5,
    top: -5,
    borderRadius: 26,
    zIndex: 1,
    height: 19,
    width: 19,
  },
});
