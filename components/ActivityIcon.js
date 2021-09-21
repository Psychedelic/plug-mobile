import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ACTIVITY_TYPES } from '../constants/activity';
import { Icon } from './icons';

const TYPE_IMAGES = {
  [ACTIVITY_TYPES.RECEIVE]: 'activityReceive',
  [ACTIVITY_TYPES.SEND]: 'activitySend',
  [ACTIVITY_TYPES.BURN]: 'activityReceive',
};

const parseImageName = name => name.replace('.svg', '').toLowerCase();

const ActivityIcon = ({ image, type }) => (
  <View style={styles.root}>
    {[ACTIVITY_TYPES.RECEIVE, ACTIVITY_TYPES.SEND].includes(type) && (
      <Icon name={TYPE_IMAGES[type]} style={styles.activity} />
    )}
    <Icon name={image ? parseImageName(image) : 'dfinity'} />
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
