import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Touchable from '@/commonComponents/Touchable';
import { Rainbow } from '@/constants/theme';

import Text from '../Text';
import styles from './styles';

type UserIconSize = 'extralarge' | 'large' | 'medium' | 'small';

interface Props {
  size?: UserIconSize;
  icon?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}
const getStyles = (size: UserIconSize) => {
  return {
    circleStyle: styles[size] as StyleProp<ViewStyle>,
    backgroundStyle: styles[`background${size}`] as StyleProp<ViewStyle>,
    textStyle: styles[`text${size}`] as StyleProp<ViewStyle>,
  };
};

const UserIcon = ({ size = 'medium', icon, style, onPress }: Props) => {
  const { backgroundStyle, textStyle, circleStyle } = getStyles(size);

  return (
    <Touchable onPress={() => onPress?.()}>
      <LinearGradient style={[styles.circle, circleStyle, style]} {...Rainbow}>
        <View style={[styles.background, backgroundStyle]}>
          <Text style={textStyle}>{icon || '👽'}</Text>
        </View>
      </LinearGradient>
    </Touchable>
  );
};

export default UserIcon;
