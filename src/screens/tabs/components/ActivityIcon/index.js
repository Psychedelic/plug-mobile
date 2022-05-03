import { Image, StyleSheet, View } from 'react-native';
import React from 'react';

import Icon from '@components/icons';

import { ACTIVITY_IMAGES } from '../constants';
import { parseImageName } from '../utils';
import styles from './styles';

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
