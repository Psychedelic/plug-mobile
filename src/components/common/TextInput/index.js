import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Text, View, TextInput as Input } from 'react-native';

import animationScales from '../../../utils/animationScales';
import { Rainbow } from '../../../constants/theme';
import Touchable from '@commonComponents/Touchable';
import { variants } from './constants';
import Icon from '../../icons';
import styles from './styles';

const TextInput = ({
  label,
  ref,
  value,
  variant,
  onChangeText,
  hideGradient,
  placeholder,
  onSubmitEditing,
  customStyle,
  textStyle,
  disabled,
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
  const [isFocused, setIsFocused] = useState(false);
  const isMultiline = variant === 'multi';

  const handleOnFocus = () => {
    setIsFocused(true);
  };

  const handleOnBlur = () => {
    setIsFocused(false);
  };

  const handleAddContact = () => {
    saveContactRef?.current.open();
  };

  return (
    <Touchable scale={animationScales.small}>
      {isFocused && !hideGradient && (
        <LinearGradient
          style={[
            styles.focusedGradient,
            isMultiline && styles.multiLineGradient,
            customStyle,
          ]}
          {...Rainbow}
        />
      )}
      <View style={[viewStyle, customStyle]}>
        {variant === 'innerLabel' && (
          <Text style={innerLabelStyle}>{label}</Text>
        )}
        <Input
          style={[inputStyle, textStyle]}
          placeholderTextColor={placeholderTextColor}
          onChangeText={onChangeText}
          autoCorrect={autoCorrect}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          onSubmitEditing={onSubmitEditing}
          blurOnSubmit={false}
          maxLength={maxLenght}
          value={value}
          editable={!disabled}
          ref={ref}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          keyboardAppearance="dark"
          {...props}
        />
        {saveContactRef && (
          <Touchable onPress={handleAddContact}>
            <Icon name="plus" />
          </Touchable>
        )}
      </View>
    </Touchable>
  );
};

export default TextInput;
