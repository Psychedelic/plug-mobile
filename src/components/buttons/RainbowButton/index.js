import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import Button from '@/buttons/Button';
import Touchable from '@/commonComponents/Touchable';
import { DisabledRainbow, Rainbow } from '@/constants/theme';

import { styles } from './styles';

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
  const disabledOrLoading = disabled || loading;
  return (
    <Touchable
      onPress={onPress}
      onLongPress={onLongPress || onPress}
      disabled={disabledOrLoading}>
      <LinearGradient
        style={[styles.button, buttonStyle]}
        {...(disabledOrLoading ? DisabledRainbow : Rainbow)}
        {...props}>
        <Button
          buttonStyle={[styles.buttonRainbow]}
          text={text}
          textStyle={[styles.textRainbow, textStyle]}
          disabled={disabledOrLoading}
          loading={loading}
          disableAnimation
          {...props}
        />
      </LinearGradient>
    </Touchable>
  );
};

export default RainbowButton;
