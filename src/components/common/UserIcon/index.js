import React from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Touchable from '../../animations/Touchable';
import { Rainbow } from '../../../constants/theme';

import styles from './styles';

const UserIcon = ({ size = 'medium', icon, style, onPress }) => (
  <Touchable onPress={onPress}>
    <LinearGradient style={[styles.circle, styles[size], style]} {...Rainbow}>
      <View style={[styles.background, styles['background' + size]]}>
        <Text style={styles['text' + size]}>{icon}</Text>
      </View>
    </LinearGradient>
  </Touchable>
);

export default UserIcon;
