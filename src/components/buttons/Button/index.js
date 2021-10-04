import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
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
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, buttonStyle]}
      {...props}>
      <Text style={[styles.text, textStyle, disabled && styles.disabled]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
