import { ErrorMessage } from '@hookform/error-message';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Image, Keyboard, Switch, View } from 'react-native';

import PlugLogo from '@/assets/icons/plug-logo-full.png';
import Header from '@/commonComponents/Header';
import PasswordInput from '@/commonComponents/PasswordInput';
import RainbowButton from '@/components/buttons/RainbowButton';
import ActionButton from '@/components/common/ActionButton';
import KeyboardScrollView from '@/components/common/KeyboardScrollView';
import Text from '@/components/common/Text';
import { Colors } from '@/constants/theme';
import useKeychain from '@/hooks/useKeychain';
import { Container } from '@/layout';
import Routes from '@/navigation/Routes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createWallet } from '@/redux/slices/keyring';

import {
  createPasswordFields,
  createPasswordRules,
  MIN_LENGTH_MESSAGE,
} from './constants';
import styles from './styles';

const CreatePassword = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { isSensorAvailable, saveBiometrics } = useKeychain();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
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
      setBiometryAvailable(isAvailable);
    });
  }, []);

  const handleCreate = async data => {
    const password = data?.password;
    setLoading(true);
    if (flow === 'import') {
      const shouldSaveBiometrics = biometryAvailable && biometrics;
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
              if (biometryAvailable && biometrics) {
                await saveBiometrics(password);
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
          <View style={styles.plugLogoContainer}>
            <Image style={styles.plugLogo} source={PlugLogo} />
          </View>
        }
      />
      <KeyboardScrollView keyboardShouldPersistTaps="always">
        <View style={styles.container}>
          <Text style={styles.title}>{t('createPassword.title')}</Text>
          <Text style={styles.subtitle}>{t('createPassword.subtitle')}</Text>
          <Controller
            name={createPasswordFields.password}
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
            name={createPasswordFields.password}
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
                    warningMessage && styles.warningText,
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
