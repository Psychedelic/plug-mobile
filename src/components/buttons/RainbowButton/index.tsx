import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Button from '@/buttons/Button';
import Touchable from '@/commonComponents/Touchable';
import { DisabledRainbow, Rainbow } from '@/constants/theme';

import { styles } from './styles';

interface Props {
  text: string;
  onPress: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
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
          onPress={onPress}
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
