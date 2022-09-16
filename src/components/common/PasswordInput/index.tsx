import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleProp, TextInputProps, TextStyle, View } from 'react-native';

import TextInput from '@/commonComponents/TextInput';
import Touchable from '@/commonComponents/Touchable';
import { TestIds } from '@/constants/testIds';
import Icon from '@/icons/index';
import animationScales from '@/utils/animationScales';

import Text from '../Text';
import styles from './styles';

interface Props extends TextInputProps {
  inputStyle?: StyleProp<TextStyle>;
  error?: boolean;
  disabled?: boolean;
  inputProps?: TextInputProps;
  onSubmit?: () => void;
}

function PasswordInput({
  onChangeText,
  value,
  style,
  inputStyle,
  error,
  placeholder,
  autoFocus,
  disabled,
  maxLength,
  inputProps,
  onBlur,
  onSubmit,
}: Props) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassowrd = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (disabled) {
      setShowPassword(false);
    }
  }, [disabled]);

  return (
    <View
      style={[styles.container, disabled && styles.disabledContainer, style]}>
      <TextInput
        value={value}
        autoFocus={autoFocus}
        autoCapitalize="none"
        onChangeText={onChangeText}
        maxLength={maxLength}
        placeholder={placeholder || t('common.enterPassword')}
        disabled={disabled}
        contentContainerStyle={styles.inputContainer}
        inputStyle={[styles.textInput, inputStyle]}
        secureTextEntry={!showPassword}
        onSubmitEditing={onSubmit}
        onBlur={onBlur}
        testID={TestIds.COMMON.PASSWORD_INPUT}
        right={
          <Touchable
            disabled={disabled}
            scale={animationScales.medium}
            onPress={toggleShowPassowrd}>
            <Icon
              name={showPassword ? 'passwordEyeClosedIcon' : 'passwordEyeIcon'}
            />
          </Touchable>
        }
        {...inputProps}
      />
      {error && (
        <Text style={styles.errorText}>{t('validations.passIncorrect')}</Text>
      )}
    </View>
  );
}

export default PasswordInput;
