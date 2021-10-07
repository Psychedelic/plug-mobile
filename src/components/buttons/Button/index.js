import React from 'react';
import { Text, View, } from 'react-native';
import animationScales from '../../../utils/animationScales';
import Touchable from '../../animations/Touchable';
import styles from './styles';

const Button = ({
  onPress,
  text,
  textStyle,
  buttonStyle,
  disabled,
  ...props
}) => {
  return (
    <Touchable scale={animationScales.medium} disabled={disabled}>
      <View
        disabled={disabled}
        onPress={onPress}
        style={[styles.button, buttonStyle]}
        {...props}>
        <Text style={[styles.text, textStyle, disabled && styles.disabled]}>
          {text}
        </Text>
      </View>
    </Touchable>
  );
};

export default Button;
