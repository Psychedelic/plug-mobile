import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import TextInput from '@/commonComponents/TextInput';
import Touchable from '@/commonComponents/Touchable';
import { TestIds } from '@/constants/testIds';
import Icon from '@/icons/index';
import animationScales from '@/utils/animationScales';

import Text from '../Text';
import styles from './styles';

function PasswordInput({
  onChange,
  password,
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
}) {
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
        value={password}
        autoFocus={autoFocus}
        onChangeText={onChange}
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
              name={`${
                showPassword ? 'passwordEyeClosedIcon' : 'passwordEyeIcon'
              }`}
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
