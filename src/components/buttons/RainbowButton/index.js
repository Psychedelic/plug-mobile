import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../Button';
import { styles } from './styles';

import { DisabledRainbow, Rainbow } from '../../../constants/theme';

const RainbowButton = ({
  text,
  onPress,
  buttonStyle,
  textStyle,
  disabled,
  ...props
}) => {
  return (
    <LinearGradient
      style={[styles.button, buttonStyle]}
      {...(disabled ? DisabledRainbow : Rainbow)}
      {...props}>
      <Button
        buttonStyle={[styles.buttonRainbow]}
        onPress={onPress}
        text={text}
        textStyle={[styles.textRainbow, textStyle]}
        disabled={disabled}
        {...props}
      />
    </LinearGradient>
  );
};

export default RainbowButton;
