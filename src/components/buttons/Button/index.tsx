import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import Touchable from '@/commonComponents/Touchable';
import Text from '@/components/common/Text';
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
  iconProps?: { height?: number; width?: number };
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
  iconProps,
  ...props
}: Props) => {
  return (
    <Touchable
      scale={animationScales.medium}
      disabled={disabled || disableAnimation}
      onPress={onPress}
      onLongPress={onLongPress || onPress}>
      <View style={[styles.button, buttonStyle]} {...props}>
        {loading ? (
          <ActivityIndicator style={StyleSheet.absoluteFill} color="white" />
        ) : (
          <>
            <Text
              type="button"
              style={[textStyle, disabled && styles.disabled]}>
              {text}
            </Text>
            {iconName && (
              <Icon name={iconName} style={iconStyle} {...iconProps} />
            )}
          </>
        )}
      </View>
    </Touchable>
  );
};

export default Button;
