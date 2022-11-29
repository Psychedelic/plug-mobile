import React from 'react';
import { Image, View } from 'react-native';

import { Text } from '@/components/common';

import styles from './styles';

interface Props {
  name?: string;
  value: string;
  icon?: string;
}

const Badge = ({ name, value, icon }: Props) => (
  <View style={styles.root}>
    {name && <Text style={styles.name}>{name}</Text>}
    <View style={styles.valueContainer}>
      {icon && (
        <View style={styles.iconContainer}>
          <Image
            source={{ uri: icon }}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
      )}
      <Text style={styles.value}>{value}</Text>
    </View>
  </View>
);

export default Badge;
