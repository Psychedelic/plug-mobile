import React, { useState, useEffect } from 'react';
import * as Keychain from 'react-native-keychain';
import { useNavigation } from '@react-navigation/core';
import { View, StatusBar, Text, Image } from 'react-native';
import Plug from '../../assets/icons/plug-white.png';
import Container from '../../components/common/Container';
import RainbowButton from '../../components/buttons/RainbowButton';
import Button from '../../components/buttons/Button';
import TextInput from '../../components/common/TextInput';
import useKeyring from '../../hooks/useKeyring';
import Routes from '../../navigation/Routes';
import styles from './styles';

function Login() {
  const [error, setError] = useState(false);
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { unlock } = useKeyring();

  const clearState = () => {
    setPassword('');
    setError(false);
  };

  const handleImport = () => {
    clearState();
    navigation.navigate(Routes.CREATE_IMPORT_LAYOUT);
  };

  const handleSubmit = async (loginPassword) => {
    const unlocked = await unlock(loginPassword);

    if (unlocked) {
      clearState();
      navigation.navigate(Routes.SWIPE_LAYOUT);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    unlockUsingBiometrics();
  });

  const unlockUsingBiometrics = async () => {
    Keychain.getGenericPassword({ service: 'ooo.plugwallet' })
      .then(({ password: biometricsPassword }) => {
        handleSubmit(biometricsPassword);
      });
  };

  return (
    <Container>
      <View style={styles.container}>
        <Image source={Plug} />
        <Text style={styles.title}>Unlock Plug</Text>
        <StatusBar barStyle="dark-content" />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Enter password"
          variant="password"
          autoFocus
        />
        {error && (
          <Text style={styles.errorText}>The password is incorrect</Text>
        )}
        <RainbowButton
          text="Submit"
          onPress={() => { handleSubmit(password) }}
          buttonStyle={styles.buttonMargin}
        />
        <Button
          text="Import new Account"
          onPress={handleImport}
          buttonStyle={styles.buttonMargin}
        />
      </View>
    </Container>
  );
}

export default Login;
