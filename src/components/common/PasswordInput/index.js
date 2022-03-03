import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import animationScales from '../../../utils/animationScales';
import { Rainbow } from '../../../constants/theme';
import Touchable from '../../animations/Touchable';
import Icon from '../../icons/index';
import TextInput from '../TextInput';
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
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleOnFocus = () => {
    setIsFocused(true);
  };

  const handleOnBlur = () => {
    setIsFocused(false);
  };

  const toggleShowPassowrd = () => {
    setShowPassword(!showPassword);
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
          placeholder={placeholder}
          disabled={disabled}
          customStyle={[styles.input, inputStyle]}
          variant={`${showPassword ? 'text' : 'password'}`}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
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
      {error && <Text style={styles.errorText}>The password is incorrect</Text>}
    </Touchable>
  );
}

export default PasswordInput;
