import React from 'react';
import { StyleProp, TextProps, ViewProps } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Button from '@/buttons/Button';
import Touchable from '@/commonComponents/Touchable';
import { DisabledRainbow, Rainbow } from '@/constants/theme';

import { styles } from './styles';

interface Props {
  text: string;
  onPress: () => void;
  buttonStyle?: StyleProp<ViewProps>;
  textStyle?: StyleProp<TextProps>;
  disabled?: boolean;
  onLongPress?: () => void;
  loading?: boolean;
}

const RainbowButton = ({
  text,
  onPress,
  buttonStyle,
  textStyle,
  disabled,
  onLongPress,
  loading = false,
  ...props
}: Props) => {
  return (
    <Touchable
      onPress={onPress}
      onLongPress={onLongPress || onPress}
      disabled={disabled}>
      <LinearGradient
        style={[styles.button, buttonStyle]}
        {...(disabled ? DisabledRainbow : Rainbow)}
        {...props}>
        <Button
          onPress={onPress}
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
