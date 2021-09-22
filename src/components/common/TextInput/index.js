import React from 'react';
import { Text, View, TextInput } from 'react-native';

const Input = ({
  label,
  value,
  variant,
  onChangeText,
  placeholder,
  customStyle,
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
      <TextInput
        style={inputStyle}
        placeholderTextColor={placeholderTextColor}
        onChangeText={onChangeText}
        autoCorrect={autoCorrect}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        value={value}
      />
    </View>
  );
};

export default Input;
