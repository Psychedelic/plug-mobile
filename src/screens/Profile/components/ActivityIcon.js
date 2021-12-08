import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import Icon from '../../../components/icons';

import { ACTIVITY_IMAGES } from './constants';
import { parseImageName } from './utils';

const ActivityIcon = ({ image, type }) => {
  return (
    <View style={styles.root}>
      {type && (
        <Icon
          name={ACTIVITY_IMAGES[type] || 'lightingActivity'}
          style={styles.activity}
        />
      )}
      {image?.includes('http') ? (
        <Image
          style={[StyleSheet.absoluteFill, styles.activityImage]}
          source={{ uri: image, type }}
        />
      ) : (
        <Icon name={image ? parseImageName(image) : 'unknown'} />
      )}
    </View>
  );
};

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
  activityImage: {
    borderRadius: 22,
  },
});
