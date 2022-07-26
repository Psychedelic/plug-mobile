import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Touchable from '@/commonComponents/Touchable';
import { Rainbow } from '@/constants/theme';

import Text from '../Text';
import styles from './styles';

const UserIcon = ({ size = 'medium', icon, style, onPress }) => (
  <Touchable onPress={onPress}>
    <LinearGradient style={[styles.circle, styles[size], style]} {...Rainbow}>
      <View style={[styles.background, styles['background' + size]]}>
        <Text style={styles['text' + size]}>{icon || '👽'}</Text>
      </View>
    </LinearGradient>
  </Touchable>
);

export default UserIcon;
