import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import TextInput from '@/commonComponents/TextInput';
import Touchable from '@/commonComponents/Touchable';
import { TestIds } from '@/constants/testIds';
import { Rainbow } from '@/constants/theme';
import Icon from '@/icons/index';
import animationScales from '@/utils/animationScales';

import Text from '../Text';
import styles from './styles';

function PasswordInput({
  onChange,
  password,
  customStyle,
  inputStyle,
  error,
  placeholder = 'Enter Password',
  autoFocus,
  disabled,
  maxLength,
  inputProps,
  onBlur,
  onSubmit,
}) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleOnFocus = () => {
    setIsFocused(true);
  };

  const handleOnBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const toggleShowPassowrd = () => {
    setShowPassword(!showPassword);
  };

  const handleOnSubmit = () => {
    setIsFocused(false);
    onSubmit?.();
  };

  useEffect(() => {
    if (disabled) {
      setShowPassword(false);
    }
  }, [disabled]);

  return (
    <Touchable scale={animationScales.small} style={customStyle}>
      {isFocused && (
        <LinearGradient
          style={[styles.focusedGradient, customStyle, inputStyle]}
          {...Rainbow}
        />
      )}
      <View
        style={[
          styles.container,
          disabled && styles.disabledContainer,
          customStyle,
        ]}>
        <TextInput
          hideGradient
          value={password}
          autoFocus={autoFocus}
          onChangeText={onChange}
          maxLength={maxLength}
          placeholder={placeholder}
          disabled={disabled}
          customStyle={[styles.input, inputStyle]}
          textStyle={styles.text}
          secureTextEntry={!showPassword}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onSubmitEditing={handleOnSubmit}
          testID={TestIds.COMMON.PASSWORD_INPUT}
          {...inputProps}
        />
        <Touchable
          disabled={disabled}
          scale={animationScales.medium}
          style={styles.eyeContainer}
          onPress={toggleShowPassowrd}>
          <Icon
            style={inputStyle}
            name={`${
              showPassword ? 'passwordEyeClosedIcon' : 'passwordEyeIcon'
            }`}
          />
        </Touchable>
      </View>
      {error && (
        <Text style={styles.errorText}>{t('validations.passIncorrect')}</Text>
      )}
    </Touchable>
  );
}

export default PasswordInput;
