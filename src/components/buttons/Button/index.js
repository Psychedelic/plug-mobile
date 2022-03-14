import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import animationScales from '../../../utils/animationScales';
import Touchable from '../../animations/Touchable';
import Icon from '../../icons';
import styles from './styles';

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
}) => {
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
