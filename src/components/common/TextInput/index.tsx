import React, { useState } from 'react';
import {
  StyleProp,
  TextInput as Input,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Touchable from '@/commonComponents/Touchable';
import { Rainbow } from '@/constants/theme';
import Icon from '@/icons';
import animationScales from '@/utils/animationScales';

import Text from '../Text';
import styles, { variants } from './styles';

interface Props extends TextInputProps {
  label: string;
  ref?: React.RefObject<Input>;
  value?: string;
  variant?: 'text' | 'password' | 'multi' | 'innerLabel';
  onChangeText?: (text: string) => void;
  hideGradient?: boolean;
  placeholder?: string;
  onSubmitEditing?: () => void;
  customStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  maxLength?: number;
  saveContactRef?: React.RefObject<any>;
}

const TextInput = ({
  label,
  ref,
  value,
  variant = 'text',
  onChangeText,
  hideGradient,
  placeholder,
  onSubmitEditing,
  customStyle,
  textStyle,
  disabled,
  maxLength,
  saveContactRef,
  testID,
  ...props
}: Props) => {
  const {
    viewStyle,
    inputStyle,
    innerLabelStyle,
    placeholderTextColor,
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
    <Touchable scale={animationScales.small} onPress={() => {}}>
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
