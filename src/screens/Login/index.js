import { View, StatusBar, Text, Image, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';

import RainbowButton from '../../components/buttons/RainbowButton';
import KeyboardHider from '../../components/common/KeyboardHider';
import PasswordInput from '../../components/common/PasswordInput';
import { isValidPassword } from '../../constants/general';
import { setAssetsLoading } from '../../redux/slices/user';
import Container from '../../components/common/Container';
import Plug from '../../assets/icons/il_white_plug.png';
import { getICPPrice } from '../../redux/slices/icp';
import Button from '../../components/buttons/Button';
import { login } from '../../redux/slices/keyring';
import useKeychain from '../../hooks/useKeychain';
import Routes from '../../navigation/Routes';
import styles from './styles';

function Login({ route, navigation }) {
  const dispatch = useDispatch();
  const isManualLock = route?.params?.manualLock || false;
  const { getPassword } = useKeychain();
  const { icpPrice } = useSelector(state => state.icp);
  const { usingBiometrics, biometricsAvailable } = useSelector(
    state => state.user,
  );

  const [error, setError] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [disableInput, setDisableInput] = useState(false);

  useEffect(() => {
    dispatch(getICPPrice());
  }, []);

  useEffect(() => {
    if (usingBiometrics && !isManualLock) {
      unlockUsingBiometrics();
    }
    dispatch(setAssetsLoading(false));
  }, [usingBiometrics, isManualLock]);

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
    setLoading(true);
    setError(false);
    Keyboard.dismiss();
    setDisableInput(true);
    dispatch(
      login({
        password: submittedPassword,
        icpPrice,
        onError: () => {
          setLoading(false);
          dispatch(setAssetsLoading(false));
          setError(true);
          setDisableInput(false);
        },
      }),
    )
      .unwrap()
      .then(unlocked => {
        if (unlocked) {
          setLoading(false);
          navigation.navigate(Routes.SWIPE_LAYOUT);
          clearState();
        }
      });
  };

  const unlockUsingBiometrics = async () => {
    if (biometricsAvailable) {
      const biometrics = await getPassword();
      if (biometrics) {
        await handleSubmit(biometrics);
      }
    }
  };

  return (
    <Container>
      <KeyboardHider>
        <View style={styles.container}>
          <Image source={Plug} style={styles.plugIcon} />
          <Text style={styles.title}>Unlock Plug</Text>
          <StatusBar barStyle="light-content" />
          <PasswordInput
            autoFocus={!isManualLock}
            error={error}
            disabled={disableInput}
            password={password}
            onChange={setPassword}
            inputStyle={styles.input}
          />
          <RainbowButton
            text="Submit"
            onPress={() => handleSubmit(password)}
            loading={loading}
            disabled={isValidPassword(password) || loading}
            buttonStyle={styles.buttonMargin}
          />
          {biometricsAvailable && (
            <Button
              iconName="faceIdIcon"
              text="Sign in with biometrics"
              onPress={unlockUsingBiometrics}
              iconStyle={styles.biometricsIcon}
              buttonStyle={[styles.buttonMargin, styles.biometricsButton]}
            />
          )}
          <Button
            iconName="arrowRight"
            text="More Options"
            onPress={handleGoToWelcome}
            iconStyle={styles.moreOptionsIcon}
            buttonStyle={[styles.buttonMargin, styles.moreOptionsButton]}
          />
        </View>
      </KeyboardHider>
    </Container>
  );
}

export default Login;
