import { View, StatusBar, Text, Image, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';

import RainbowButton from '../../components/buttons/RainbowButton';
import KeyboardHider from '../../components/common/KeyboardHider';
import PasswordInput from '../../components/common/PasswordInput';
import { setAssetsLoading } from '../../redux/slices/user';
import Container from '../../components/common/Container';
import Plug from '../../assets/icons/plug-white.png';
import { useICPPrice } from '../../redux/slices/icp';
import Button from '../../components/buttons/Button';
import { login } from '../../redux/slices/keyring';
import useKeychain from '../../hooks/useKeychain';
import Routes from '../../navigation/Routes';
import styles from './styles';

function Login() {
  const [error, setError] = useState(false);
  const [disableInput, setDisableInput] = useState(false);
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { getPassword, isSensorAvailable } = useKeychain();
  const dispatch = useDispatch();
  const icpPrice = useICPPrice();
  const { assetsLoading, usingBiometrics } = useSelector(state => state.user);

  const clearState = () => {
    setPassword('');
    setError(false);
    setDisableInput(false);
  };

  const handleGoToWelcome = () => {
    clearState();
    navigation.navigate(Routes.WELCOME_SCREEN);
  };

  const handleSubmit = async submittedPassword => {
    setError(false);
    Keyboard.dismiss();
    setDisableInput(true);
    dispatch(setAssetsLoading(true));
    dispatch(
      login({
        password: submittedPassword,
        icpPrice,
        onError: () => {
          dispatch(setAssetsLoading(false));
          setError(true);
          setDisableInput(false);
        },
      }),
    )
      .unwrap()
      .then(unlocked => {
        if (unlocked) {
          navigation.navigate(Routes.SWIPE_LAYOUT);
          clearState();
        }
      });
  };

  const unlockUsingBiometrics = async () => {
    const isAvailable = await isSensorAvailable();

    if (isAvailable) {
      const biometrics = await getPassword();

      if (biometrics) {
        await handleSubmit(biometrics);
      }
    }
  };

  useEffect(() => {
    if (usingBiometrics) {
      unlockUsingBiometrics();
    }
    dispatch(setAssetsLoading(false));
  }, [usingBiometrics]);

  return (
    <KeyboardHider>
      <Container>
        <View style={styles.container}>
          <Image source={Plug} />
          <Text style={styles.title}>Unlock Plug</Text>
          <StatusBar barStyle="light-content" />
          <PasswordInput
            autoFocus
            error={error}
            disabled={disableInput}
            password={password}
            onChange={setPassword}
            customStyle={styles.input}
          />
          <RainbowButton
            text="Unlock Wallet"
            onPress={() => handleSubmit(password)}
            loading={assetsLoading}
            disabled={!password || password.length < 12}
            buttonStyle={styles.buttonMargin}
          />
          <Button
            text="Import new Account"
            onPress={handleGoToWelcome}
            buttonStyle={styles.buttonMargin}
          />
        </View>
      </Container>
    </KeyboardHider>
  );
}

export default Login;
