import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const Button = ({ onPress, text, textStyle, buttonStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
