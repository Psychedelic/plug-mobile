import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import Touchable from '@/commonComponents/Touchable';
import Icon from '@/icons';
import animationScales from '@/utils/animationScales';

import styles from './styles';

interface Props {
  onPress: () => void;
  onLongPress?: () => void;
  text: string;
  buttonStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconName?: string;
  disabled?: boolean;
  disableAnimation?: boolean;
  loading?: boolean;
}

const Button = ({
  onPress,
  onLongPress,
  text,
  textStyle,
  iconName,
  buttonStyle,
  iconStyle,
  disabled = false,
  disableAnimation = false,
  loading = false,
  ...props
}: Props) => {
  return (
    <Touchable
      scale={animationScales.medium}
      disabled={disabled || disableAnimation}
      onPress={onPress}
      onLongPress={onLongPress}>
      <View style={[styles.button, buttonStyle]} {...props}>
        {loading ? (
          <ActivityIndicator style={StyleSheet.absoluteFill} color="white" />
        ) : (
          <>
            <Text style={[styles.text, textStyle, disabled && styles.disabled]}>
              {text}
            </Text>
            {iconName && <Icon name={iconName} style={iconStyle} />}
          </>
        )}
      </View>
    </Touchable>
  );
};

export default Button;
