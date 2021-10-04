import React from 'react';
import { Text, View, TextInput as Input } from 'react-native';
import { variants } from './constants';

const TextInput = ({
  label,
  value,
  variant,
  onChangeText,
  placeholder,
  customStyle,
  ...props
}) => {
  const {
    viewStyle,
    inputStyle,
    innerLabelStyle,
    placeholderTextColor,
    autoCorrect,
    autoCapitalize,
    secureTextEntry,
  } = variants[variant];

  return (
    <View style={[viewStyle, customStyle]}>
      {variant === 'innerLabel' && <Text style={innerLabelStyle}>{label}</Text>}
      <Input
        style={inputStyle}
        placeholderTextColor={placeholderTextColor}
        onChangeText={onChangeText}
        autoCorrect={autoCorrect}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        value={value}
        {...props}
      />
    </View>
  );
};

export default TextInput;
