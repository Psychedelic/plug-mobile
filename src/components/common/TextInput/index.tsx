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

import styles, { defaultPlaceholderTextColor } from './styles';

interface Props extends TextInputProps {
  ref?: React.RefObject<Input>;
  hideGradient?: boolean;
  customStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
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
  textStyle,
  disabled,
  maxLength,
  left,
  right,
  testID,
  placeholderTextColor = defaultPlaceholderTextColor,
  secureTextEntry,
  multiline,
  ...props
}: Props) => {
  const viewStyle = [styles.viewStyle, multiline && styles.multiStyle];
  const baseInputStyle = [styles.inputStyle, multiline && styles.multiStyle];
  const [isFocused, setIsFocused] = useState(false);

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
            multiline && styles.multiLineGradient,
            customStyle,
          ]}
          {...Rainbow}
        />
      )}
      <View style={[viewStyle, customStyle]}>
        {left}
        <Input
          style={[baseInputStyle, textStyle]}
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
