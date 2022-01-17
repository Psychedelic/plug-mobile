import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../Button';
import { styles } from './styles';

import { DisabledRainbow, Rainbow } from '../../../constants/theme';
import Touchable from '../../animations/Touchable';

const RainbowButton = ({
  text,
  onPress,
  buttonStyle,
  textStyle,
  disabled,
  onLongPress,
  loading = false,
  ...props
}) => {
  return (
    <Touchable onPress={onPress} onLongPress={onLongPress} disabled={disabled}>
      <LinearGradient
        style={[styles.button, buttonStyle]}
        {...(disabled ? DisabledRainbow : Rainbow)}
        {...props}>
        <Button
          buttonStyle={[styles.buttonRainbow]}
          text={text}
          textStyle={[styles.textRainbow, textStyle]}
          disabled={disabled || loading}
          loading={loading}
          disableAnimation
          {...props}
        />
      </LinearGradient>
    </Touchable>
  );
};

export default RainbowButton;
