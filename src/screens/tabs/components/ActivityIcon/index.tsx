import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Image } from '@/components/common';
import Icon from '@/components/icons';

import { getNativeTokensLogo, getTypeIcon } from '../utils';
import styles from './styles';

interface Props {
  logo?: string;
  type?: string;
  symbol: string;
}

const ActivityIcon = ({ logo, type, symbol }: Props) => {
  return (
    <View style={styles.root}>
      {type && <Icon name={getTypeIcon(type)} style={styles.activity} />}
      {logo ? (
        <Image
          style={[StyleSheet.absoluteFill, styles.activityImage]}
          url={logo}
        />
      ) : (
        <Icon name={getNativeTokensLogo(symbol)} />
      )}
    </View>
  );
};

export default ActivityIcon;
