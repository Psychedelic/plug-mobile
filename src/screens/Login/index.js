import { View, StatusBar, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';

import RainbowButton from '../../components/buttons/RainbowButton';
import KeyboardHider from '../../components/common/KeyboardHider';
import { DEFAULT_KEYCHAIN_OPTIONS } from '../../redux/constants';
import { setAssetsLoading } from '../../redux/slices/user';
import TextInput from '../../components/common/TextInput';
import Container from '../../components/common/Container';
import Plug from '../../assets/icons/plug-white.png';
import { useICPPrice } from '../../redux/slices/icp';
import Button from '../../components/buttons/Button';
import { login } from '../../redux/slices/keyring';
import Keychain from '../../modules/keychain';
import Routes from '../../navigation/Routes';
import styles from './styles';

function Login() {
  const [error, setError] = useState(false);
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const icpPrice = useICPPrice();
  const { assetsLoading } = useSelector(state => state.user);

  const clearState = () => {
    setPassword('');
    setError(false);
  };

  const handleImport = () => {
    clearState();
    navigation.navigate(Routes.CREATE_IMPORT_LAYOUT);
  };

  const handleSubmit = async submittedPassword => {
    dispatch(setAssetsLoading(true));
    dispatch(
      login({
        password: submittedPassword,
        icpPrice,
        onError: () => {
          dispatch(setAssetsLoading(false));
          setError(true);
        },
      }),
    )
      .unwrap()
      .then(unlocked => {
        if (unlocked) {
          navigation.navigate(Routes.SWIPE_LAYOUT);
        }
      });
    clearState();
  };

  useEffect(() => {
    unlockUsingBiometrics();
    dispatch(setAssetsLoading(false));
  }, []);

  const unlockUsingBiometrics = async () => {
    const isAvailable = await Keychain.isSensorAvailable();

    if (isAvailable) {
      const biometrics = await Keychain.getPassword();

      if (biometrics) {
        await handleSubmit(biometrics);
      }
    }
  };

  return (
    <KeyboardHider>
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
            onPress={() => handleSubmit(password)}
            loading={assetsLoading}
            buttonStyle={styles.buttonMargin}
          />
          <Button
            text="Import new Account"
            onPress={handleImport}
            buttonStyle={styles.buttonMargin}
          />
        </View>
      </Container>
    </KeyboardHider>
  );
}

export default Login;
