import { ErrorMessage } from '@hookform/error-message';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Image, Switch, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import PlugLogo from '@/assets/icons/plug-logo-full.png';
import Back from '@/commonComponents/Back';
import Header from '@/commonComponents/Header';
import KeyboardHider from '@/commonComponents/KeyboardHider';
import PasswordInput from '@/commonComponents/PasswordInput';
import RainbowButton from '@/components/buttons/RainbowButton';
import useKeychain from '@/hooks/useKeychain';
import { Container } from '@/layout';
import Routes from '@/navigation/Routes';
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
  const dispatch = useDispatch();

  const { icpPrice } = useSelector(state => state.icp);
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
        left={<Back onPress={() => goBack()} />}
        center={
          <View style={styles.plugLogoContainer}>
            <Image style={styles.plugLogo} source={PlugLogo} />
          </View>
        }
      />
      <KeyboardHider>
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
                password={value}
                onChange={onChange}
                customStyle={styles.passwordInput}
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
              <Switch onValueChange={toggleSwitch} value={biometrics} />
            </View>
          )}
          <RainbowButton
            text={t('common.continue')}
            loading={loading}
            onPress={handleSubmit(handleCreate)}
            buttonStyle={styles.rainbowButton}
            disabled={loading || !!errors.password || !getValues().password}
          />
        </View>
      </KeyboardHider>
    </Container>
  );
};

export default CreatePassword;
