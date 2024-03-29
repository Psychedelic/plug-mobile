import { ErrorMessage } from '@hookform/error-message';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Image, Keyboard, Switch, View } from 'react-native';

import PlugLogo from '@/assets/icons/plug-logo-full.png';
import RainbowButton from '@/components/buttons/RainbowButton';
import { ActionButton, Header, PasswordInput, Text } from '@/components/common';
import KeyboardScrollView from '@/components/common/KeyboardScrollView';
import { Colors } from '@/constants/theme';
import useKeychain from '@/hooks/useKeychain';
import { RootScreenProps } from '@/interfaces/navigation';
import { Container } from '@/layout';
import Routes from '@/navigation/Routes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createWallet } from '@/redux/slices/keyring';

import { createPasswordRules, MIN_LENGTH_MESSAGE } from './constants';
import styles from './styles';

type FormValues = {
  password: string;
};

const CreatePassword = ({
  route,
  navigation,
}: RootScreenProps<Routes.CREATE_PASSWORD>) => {
  const { t } = useTranslation();
  const { isSensorAvailable, saveBiometrics, resetBiometrics } = useKeychain();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValues>({
    defaultValues: { password: '' },
    mode: 'onChange',
    criteriaMode: 'all',
  });
  const dispatch = useAppDispatch();

  const { icpPrice } = useAppSelector(state => state.icp);
  const flow = route.params?.flow;
  const { goBack } = navigation;
  const [loading, setLoading] = useState(false);
  const [biometrics, setBiometrics] = useState(false);
  const [biometryAvailable, setBiometryAvailable] = useState(false);

  const toggleSwitch = () => setBiometrics(previousState => !previousState);

  useEffect(() => {
    isSensorAvailable().then(isAvailable => {
      setBiometryAvailable(!!isAvailable);
    });
  }, []);

  const handleCreate = async (data: FormValues) => {
    const password = data.password;
    setLoading(true);
    const shouldSaveBiometrics = biometryAvailable && biometrics;
    if (flow === 'import') {
      navigation.navigate(Routes.IMPORT_SEED_PHRASE, {
        password,
        shouldSaveBiometrics,
      });
      setLoading(false);
    } else {
      try {
        dispatch(createWallet({ password, icpPrice }))
          .unwrap()
          .then(async result => {
            if (result?.mnemonic) {
              if (shouldSaveBiometrics) {
                await saveBiometrics(password);
              } else {
                resetBiometrics();
              }
              navigation.navigate(Routes.BACKUP_SEED_PHRASE, {
                mnemonic: result.mnemonic,
              });
              setLoading(false);
            }
          });
      } catch (e) {
        console.log('Error:', e);
      }
    }
  };

  return (
    <Container>
      <Header
        left={
          <ActionButton onPress={() => goBack()} label={t('common.back')} />
        }
        center={
          <Image
            style={styles.plugLogo}
            source={PlugLogo}
            resizeMode="contain"
          />
        }
      />
      <KeyboardScrollView keyboardShouldPersistTaps="always">
        <View style={styles.container}>
          <Text style={styles.title}>{t('createPassword.title')}</Text>
          <Text style={styles.subtitle}>{t('createPassword.subtitle')}</Text>
          <Controller
            name="password"
            control={control}
            rules={createPasswordRules}
            render={({ field: { onChange, onBlur, value } }) => (
              <PasswordInput
                maxLength={24}
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                style={styles.passwordInput}
                onSubmit={
                  biometryAvailable
                    ? Keyboard.dismiss
                    : handleSubmit(handleCreate)
                }
              />
            )}
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message, messages }) => {
              const choosenMessage = messages?.pattern
                ? messages?.pattern
                : message;
              const warningMessage =
                messages?.minLength && choosenMessage === MIN_LENGTH_MESSAGE;

              return (
                <Text
                  style={[
                    styles.errorText,
                    !!warningMessage && styles.warningText,
                  ]}>
                  {choosenMessage}
                </Text>
              );
            }}
          />
          {biometryAvailable && (
            <View style={styles.switchContainer}>
              <Text style={styles.faceId}>{t('common.biometricSignIn')}</Text>
              <Switch
                onValueChange={toggleSwitch}
                value={biometrics}
                trackColor={{ false: Colors.Gray.Pure }}
              />
            </View>
          )}
          <RainbowButton
            text={t('common.continue')}
            loading={loading}
            onPress={handleSubmit(handleCreate)}
            buttonStyle={styles.rainbowButton}
            disabled={!!errors.password || !getValues().password}
          />
        </View>
      </KeyboardScrollView>
    </Container>
  );
};

export default CreatePassword;
