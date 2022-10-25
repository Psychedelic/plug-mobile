import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Keyboard, View } from 'react-native';

import Plug from '@/assets/icons/il_white_plug.png';
import PasswordInput from '@/commonComponents/PasswordInput';
import Button from '@/components/buttons/Button';
import RainbowButton from '@/components/buttons/RainbowButton';
import KeyboardScrollView from '@/components/common/KeyboardScrollView';
import Text from '@/components/common/Text';
import { isValidPassword } from '@/constants/general';
import { Colors } from '@/constants/theme';
import useKeychain from '@/hooks/useKeychain';
import { ScreenProps } from '@/interfaces/navigation';
import { Container } from '@/layout';
import Routes from '@/navigation/Routes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getICPPrice } from '@/redux/slices/icp';
import { login } from '@/redux/slices/keyring';

import styles from './styles';

function Login({ route, navigation }: ScreenProps<Routes.LOGIN>) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const isManualLock = route?.params?.manualLock || false;
  const { getPassword } = useKeychain();
  const { icpPrice } = useAppSelector(state => state.icp);
  const { usingBiometrics, biometricsAvailable } = useAppSelector(
    state => state.user
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
  }, [usingBiometrics, isManualLock]);

  const clearState = () => {
    setPassword('');
    setError(false);
    setDisableInput(false);
  };

  const handleGoToWelcome = () => {
    clearState();
    navigation.navigate(Routes.WELCOME);
  };

  const handleSubmit = async (submittedPassword: string) => {
    setLoading(true);
    setError(false);
    Keyboard.dismiss();
    setDisableInput(true);
    dispatch(
      login({
        password: submittedPassword,
        icpPrice,
      })
    )
      .unwrap()
      .then(unlocked => {
        if (unlocked) {
          setLoading(false);
          navigation.navigate(Routes.SWIPE_LAYOUT);
          clearState();
        }
      })
      .catch(() => {
        setLoading(false);
        setError(true);
        setDisableInput(false);
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
      <KeyboardScrollView contentStyle={styles.container}>
        <Image source={Plug} style={styles.plugIcon} resizeMode="contain" />
        <View>
          <Text style={styles.title}>{t('login.unlock')}</Text>
        </View>
        <PasswordInput
          autoFocus={!isManualLock}
          error={error}
          disabled={disableInput}
          value={password}
          onChangeText={setPassword}
          onSubmit={() => handleSubmit(password)}
        />
        <RainbowButton
          text={t('login.submit')}
          onPress={() => handleSubmit(password)}
          loading={loading}
          disabled={!isValidPassword(password)}
          buttonStyle={styles.buttonMargin}
        />
        {biometricsAvailable && usingBiometrics && (
          <Button
            iconName="faceIdIcon"
            text={t('login.signInBiometric')}
            onPress={unlockUsingBiometrics}
            iconStyle={styles.biometricsIcon}
            iconProps={{ height: 24, width: 24 }}
            buttonStyle={[styles.buttonMargin, styles.biometricsButton]}
          />
        )}
        <Button
          iconName="arrowRight"
          text={t('login.moreOptions')}
          onLongPress={handleGoToWelcome}
          onPress={handleGoToWelcome}
          iconStyle={styles.moreOptionsIcon}
          buttonStyle={[styles.buttonMargin, styles.moreOptionsButton]}
          textStyle={styles.moreOptionsText}
          iconProps={{ color: Colors.Gray.Pure }}
        />
      </KeyboardScrollView>
    </Container>
  );
}

export default Login;
