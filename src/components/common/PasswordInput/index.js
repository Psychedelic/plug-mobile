import React, { useState } from 'react';
import { Text, View } from 'react-native';

import scales from '../../../utils/animationScales';
import Touchable from '../../animations/Touchable';
import Icon from '../../icons/index';
import TextInput from '../TextInput';
import styles from './styles';

function PasswordInput({ onChange, password, customStyle, error }) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassowrd = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View>
      <TextInput
        value={password}
        variant={`${showPassword ? 'text' : 'password'}`}
        onChangeText={onChange}
        placeholder="Enter Password"
        customStyle={[styles.input, customStyle]}
      />
      {error && <Text style={styles.errorText}>The password is incorrect</Text>}
      <Touchable
        scale={scales.medium}
        style={styles.eyeContainer}
        onPress={toggleShowPassowrd}>
        <Icon
          name={`${showPassword ? 'passwordEyeIcon' : 'passwordEyeClosedIcon'}`}
        />
      </Touchable>
    </View>
  );
}

export default PasswordInput;
