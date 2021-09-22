import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../constants/theme';

const Button = ({ text, onPress, variant, buttonStyle, textStyle }) => {
  const { buttonVariant, textVariant } = variants[variant];

  return (
    <WithRainbowGradient variant={variant} buttonStyle={buttonStyle}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.button,
          buttonVariant,
          variant !== 'rainbow' && buttonStyle,
        ]}>
        <Text style={[styles.text, textVariant, textStyle]}>{text}</Text>
      </TouchableOpacity>
    </WithRainbowGradient>
  );
};

export default Button;

const WithRainbowGradient = ({ variant, children, buttonStyle }) =>
  variant === 'rainbow' ? (
    <LinearGradient
      style={[styles.button, styles.buttonRainbow, buttonStyle]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[
        'rgb(255, 231, 1)',
        'rgb(250, 81, 211)',
        'rgb(16, 217, 237)',
        'rgb(82, 255, 83)',
      ]}>
      {children}
    </LinearGradient>
  ) : (
    children
  );

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    width: '100%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonRainbow: {},
  buttonGray: {
    backgroundColor: Colors.Gray.Primary,
  },
  textRainbow: {
    color: Colors.White.Pure,
  },
  textGray: {
    color: Colors.White.Pure,
  },
});

const variants = {
  rainbow: {
    buttonVariant: styles.buttonRainbow,
    textVariant: styles.textRainbow,
  },
  gray: {
    buttonVariant: styles.buttonGray,
    textVariant: styles.textGray,
  },
};
