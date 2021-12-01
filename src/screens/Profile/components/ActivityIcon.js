import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import Icon from '../../../components/icons';

import { ACTIVITY_IMAGES } from './constants';
import { parseImageName } from './utils';

const ActivityIcon = ({ image, type }) => {
  console.log('In ActivityIcon', type, ACTIVITY_IMAGES[type]);
  return (
    <View style={styles.root}>
      {type && type !== 'RECEIVE' && (
        <Icon
          name={ACTIVITY_IMAGES[type] || 'lightingActivity'}
          style={styles.activity}
        />
      )}
      {image.includes('https') ? (
        <Image source={image} style={styles.canisterImg} />
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
});
