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

import styles, { defaultPlaceholderTextColor } from './styles';

interface Props extends TextInputProps {
  ref?: React.RefObject<Input>;
  hideGradient?: boolean;
  customStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const TextInput = ({
  ref,
  value,
  onChangeText,
  hideGradient,
  placeholder,
  onSubmitEditing,
  customStyle,
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
  ...props
}: Props) => {
  const adjustInnerHeight = useMemo(
    () => (style ? Object.keys(style).includes('height') : false),
    [style]
  );

  const innerContainerStyle = [
    styles.innerContainer,
    adjustInnerHeight && styles.grow,
    multiline && styles.multilineContainer,
  ];

  const [isFocused, setIsFocused] = useState(false);
  const gradient = useMemo(
    () => (isFocused && !hideGradient ? Rainbow : TransparentGradient),
    [isFocused, hideGradient]
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
      style={[styles.gradientContainer, customStyle, style]}
      {...gradient}>
      <View style={[innerContainerStyle, contentContainerStyle]}>
        {left}
        <Input
          style={[styles.textInput, inputStyle]}
          placeholderTextColor={placeholderTextColor}
          onChangeText={onChangeText}
          autoCorrect={false}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          onSubmitEditing={onSubmitEditing}
          blurOnSubmit={false}
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
