import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Keyboard, ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Plug from '@/assets/icons/il_white_plug.png';
import PasswordInput from '@/commonComponents/PasswordInput';
import Button from '@/components/buttons/Button';
import RainbowButton from '@/components/buttons/RainbowButton';
import Icon from '@/components/icons';
import { isValidPassword } from '@/constants/general';
import { IS_MEDIUM_DEVICE } from '@/constants/platform';
import useKeychain from '@/hooks/useKeychain';
import useLoginAnimation from '@/hooks/useLoginAnimation';
import { Container } from '@/layout';
import Routes from '@/navigation/Routes';
import { getICPPrice } from '@/redux/slices/icp';
import { login } from '@/redux/slices/keyring';
import { setAssetsLoading } from '@/redux/slices/user';

import styles from './styles';

function Login({ route, navigation }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isManualLock = route?.params?.manualLock || false;
  const { getPassword } = useKeychain();
  const { icpPrice } = useSelector(state => state.icp);
  const { usingBiometrics, biometricsAvailable } = useSelector(
    state => state.user
  );
  const [error, setError] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [disableInput, setDisableInput] = useState(false);
  const {
    isKeyboardOpen,
    animatedLogoStyle,
    animatedTitleStyle,
    animatedFaceIDStyle,
  } = useLoginAnimation();

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
      })
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
      <ScrollView
        bounces={false}
        contentContainerStyle={[
          styles.container,
          isKeyboardOpen &&
            (!IS_MEDIUM_DEVICE
              ? styles.containerBigDevice
              : styles.containerSmallDevice),
        ]}
        keyboardShouldPersistTaps="never">
        <View
          style={[
            styles.topContentContainer,
            isKeyboardOpen && !IS_MEDIUM_DEVICE && styles.topContentBigDevice,
          ]}>
          <Animated.Image
            source={Plug}
            style={[styles.plugIcon, animatedLogoStyle]}
          />
          <Animated.View style={animatedTitleStyle}>
            <Text style={styles.title}>{t('login.unlockPlug')}</Text>
          </Animated.View>
          {biometricsAvailable && usingBiometrics && (
            <Animated.View
              style={[styles.headerBiometricsButton, animatedFaceIDStyle]}>
              <Icon name="faceIdIcon" />
            </Animated.View>
          )}
        </View>
        <View style={styles.bottomContentContainer}>
          <PasswordInput
            autoFocus={!isManualLock}
            error={error}
            disabled={disableInput}
            password={password}
            onChange={setPassword}
            inputStyle={styles.input}
            onSubmit={() => handleSubmit(password)}
          />
          <RainbowButton
            text={t('login.unlock')}
            onPress={() => handleSubmit(password)}
            loading={loading}
            disabled={!isValidPassword(password)}
            buttonStyle={styles.buttonMargin}
          />
        </View>
        {biometricsAvailable && usingBiometrics && !isKeyboardOpen && (
          <Button
            iconName="faceIdIcon"
            text={t('login.signInBiometric')}
            onPress={unlockUsingBiometrics}
            iconStyle={styles.biometricsIcon}
            buttonStyle={[styles.buttonMargin, styles.biometricsButton]}
          />
        )}
        <Button
          iconName="arrowRight"
          text={t('login.moreOptions')}
          onLongPress={handleGoToWelcome}
          onPress={handleGoToWelcome}
          iconStyle={styles.moreOptionsIcon}
          buttonStyle={[
            styles.buttonMargin,
            styles.moreOptionsButton,
            isKeyboardOpen &&
              IS_MEDIUM_DEVICE &&
              styles.moreOptionsButtonSmallDevice,
          ]}
        />
      </ScrollView>
    </Container>
  );
}

export default Login;
