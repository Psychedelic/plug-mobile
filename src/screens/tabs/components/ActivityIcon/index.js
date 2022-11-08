import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Image } from '@/components/common';
import Icon from '@/components/icons';
import { ACTIVITY_IMAGES } from '@/constants/business';

import { parseImageName } from '../utils';
import styles from './styles';

const ActivityIcon = ({ image, type, symbol }) => {
  return (
    <View style={styles.root}>
      {type && (
        <Icon
          name={ACTIVITY_IMAGES[type] || 'actionActivity'}
          style={styles.activity}
        />
      )}
      {image?.includes('http') ? (
        <Image
          style={[StyleSheet.absoluteFill, styles.activityImage]}
          url={image}
        />
      ) : (
        <Icon name={image ? parseImageName(image) : 'unknown'} />
        // <Icon name={symbol ? `${symbol}`.toLowerCase() : 'unknown'} />
      )}
    </View>
  );
};

export default ActivityIcon;
