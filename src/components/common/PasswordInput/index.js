import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

import scales from '../../../utils/animationScales';
import Touchable from '../../animations/Touchable';
import Icon from '../../icons/index';
import TextInput from '../TextInput';
import styles from './styles';

function PasswordInput({
  onChange,
  password,
  customStyle,
  error,
  placeholder = 'Enter Password',
  autoFocus,
  disabled,
}) {
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
    <View style={disabled && styles.disabledContainer}>
      <TextInput
        value={password}
        autoFocus={autoFocus}
        onChangeText={onChange}
        placeholder={placeholder}
        disabled={disabled}
        customStyle={[styles.input, customStyle]}
        variant={`${showPassword ? 'text' : 'password'}`}
      />
      {error && <Text style={styles.errorText}>The password is incorrect</Text>}
      <Touchable
        disabled={disabled}
        scale={scales.medium}
        style={styles.eyeContainer}
        onPress={toggleShowPassowrd}>
        <Icon
          style={customStyle}
          name={`${showPassword ? 'passwordEyeClosedIcon' : 'passwordEyeIcon'}`}
        />
      </Touchable>
    </View>
  );
}

export default PasswordInput;
