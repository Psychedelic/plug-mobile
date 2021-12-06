import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import animationScales from '../../../utils/animationScales';
import Touchable from '../../animations/Touchable';
import styles from './styles';

const Button = ({
  onPress,
  onLongPress,
  text,
  textStyle,
  buttonStyle,
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
        {
          loading ? (
            <ActivityIndicator
              style={StyleSheet.absoluteFill}
            />
          )
            :
            <Text style={[styles.text, textStyle, disabled && styles.disabled]}>
              {text}
            </Text>
        }
      </View>
    </Touchable>
  );
};

export default Button;
