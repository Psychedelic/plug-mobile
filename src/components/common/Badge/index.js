import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from './styles';

const Badge = ({ name, value, icon }) => (
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
