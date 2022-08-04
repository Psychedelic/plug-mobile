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
import animationScales from '@/utils/animationScales';

import Text from '../Text';
import styles, { variants } from './styles';

interface Props extends TextInputProps {
  label?: string;
  ref?: React.RefObject<Input>;
  variant?: 'text' | 'password' | 'multi' | 'innerLabel';
  hideGradient?: boolean;
  customStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  right?: () => React.ReactNode;
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
  right,
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
        {right}
      </View>
    </Touchable>
  );
};

export default TextInput;
