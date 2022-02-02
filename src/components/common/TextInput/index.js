import React from 'react';
import { Text, View, TextInput as Input } from 'react-native';

import Icon from '../../icons';
import { variants } from './constants';
import Touchable from '../../animations/Touchable';

const TextInput = ({
  label,
  value,
  variant,
  onChangeText,
  placeholder,
  customStyle,
  textStyle,
  maxLenght,
  saveContactRef,
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

  const handleAddContact = () => {
    saveContactRef?.current.open();
  };

  return (
    <View style={[viewStyle, customStyle]}>
      {variant === 'innerLabel' && <Text style={innerLabelStyle}>{label}</Text>}
      <Input
        style={[inputStyle, textStyle]}
        placeholderTextColor={placeholderTextColor}
        onChangeText={onChangeText}
        autoCorrect={autoCorrect}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        blurOnSubmit={false}
        maxLength={maxLenght}
        value={value}
        keyboardAppearance="dark"
        {...props}
      />
      {saveContactRef && (
        <Touchable onPress={handleAddContact}>
          <Icon name="plus" />
        </Touchable>
      )}
    </View>
  );
};

export default TextInput;
