import React, { useMemo, useState } from 'react';
import {
  StyleProp,
  TextInput as Input,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Rainbow, TransparentGradient } from '@/constants/theme';

import styles, {
  defaultPlaceholderTextColor,
  errorColor,
  getCustomGradient,
} from './styles';

interface Props extends TextInputProps {
  ref?: React.RefObject<Input>;
  hideGradient?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
  error?: boolean;
}

const TextInput = ({
  ref,
  value,
  onChangeText,
  hideGradient,
  placeholder,
  onSubmitEditing,
  inputStyle,
  disabled,
  maxLength,
  left,
  right,
  testID,
  placeholderTextColor = defaultPlaceholderTextColor,
  secureTextEntry,
  multiline,
  style,
  contentContainerStyle,
  onBlur,
  onFocus,
  blurOnSubmit,
  error,
  ...props
}: Props) => {
  const customBackgroundColor = useMemo(
    () =>
      contentContainerStyle &&
      Object.keys(contentContainerStyle).includes('backgroundColor')
        ? (contentContainerStyle as ViewStyle).backgroundColor
        : false,
    [contentContainerStyle]
  );

  const innerContainerStyle = [
    styles.innerContainer,
    multiline && styles.multilineContainer,
  ];

  const [isFocused, setIsFocused] = useState(false);
  const gradient = useMemo(
    () =>
      error
        ? getCustomGradient(errorColor)
        : isFocused && !hideGradient
        ? Rainbow
        : customBackgroundColor
        ? getCustomGradient(customBackgroundColor as string)
        : TransparentGradient,
    [isFocused, hideGradient, error, customBackgroundColor]
  );

  const handleOnFocus = (event: any) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleOnBlur = (event: any) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  return (
    <LinearGradient
      style={[
        styles.gradientContainer,
        !multiline && styles.singleLine,
        disabled && styles.disabledContainer,
        style,
      ]}
      {...gradient}>
      <View style={[innerContainerStyle, contentContainerStyle]}>
        {left}
        <Input
          underlineColorAndroid="transparent"
          style={[styles.textInput, inputStyle]}
          placeholderTextColor={placeholderTextColor}
          onChangeText={onChangeText}
          autoCorrect={false}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          onSubmitEditing={onSubmitEditing}
          blurOnSubmit={blurOnSubmit}
          maxLength={maxLength}
          value={value}
          editable={!disabled}
          ref={ref}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          keyboardAppearance="dark"
          testID={testID}
          multiline={multiline}
          {...props}
        />
        {right}
      </View>
    </LinearGradient>
  );
};

export default TextInput;
