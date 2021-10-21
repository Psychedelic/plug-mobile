import React from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Rainbow } from '../../../constants/theme';

import styles from './styles';

const UserIcon = ({ size = 'medium', icon, style }) => (
  <LinearGradient style={[styles.circle, styles[size], style]} {...Rainbow}>
    <View style={[styles.background, styles['background' + size]]}>
      <Text style={styles['text' + size]}>{icon}</Text>
    </View>
  </LinearGradient>
);

export default UserIcon;
