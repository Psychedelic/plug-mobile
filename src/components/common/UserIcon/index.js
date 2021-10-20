import React from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Rainbow } from '../../../constants/theme';

import styles from './styles';

const UserIcon = ({ size = 'medium', icon }) => (
  <LinearGradient style={[styles.circle, styles[size]]} {...Rainbow}>
    <View style={[styles.background, styles['background' + size]]}>
      <Text style={styles['text' + size]}>{icon}</Text>
    </View>
  </LinearGradient>
);

export default UserIcon;
