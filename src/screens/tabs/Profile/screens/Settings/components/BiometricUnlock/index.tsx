import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import Header from '@/commonComponents/Header';
import Modal from '@/commonComponents/Modal';
import PasswordInput from '@/commonComponents/PasswordInput';
import RainbowButton from '@/components/buttons/RainbowButton';
import Text from '@/components/common/Text';
import { isValidPassword } from '@/constants/general';
import { FontStyles } from '@/constants/theme';
import { Colors } from '@/constants/theme';
import useKeychain from '@/hooks/useKeychain';
import { Column } from '@/layout';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { validatePassword } from '@/redux/slices/keyring';

import styles from './styles';

interface Props {
  modalRef: React.RefObject<Modalize>;
}

function BiometricUnlock({ modalRef }: Props) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { saveBiometrics, resetBiometrics } = useKeychain();
  const hasBiometrics = useAppSelector(state => state.user.usingBiometrics);
  const [useBiometrics, setUseBiometrics] = useState(hasBiometrics);

  const [password, setPassword] = useState<string>();
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleSwitch = async () => {
    // Inverse logic to avoid race condition of setState.
    if (useBiometrics) {
      setUseBiometrics(!useBiometrics);
      await resetBiometrics();
    } else {
      setUseBiometrics(!useBiometrics);
      await saveBiometrics(password);
    }
  };

  const handleOnClose = () => {
    setPassword(undefined);
    setError(false);
    setLoggedIn(false);
    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (password) {
      dispatch(
        validatePassword({
          password,
          onError: () => {
            setError(true);
            setLoading(false);
          },
          onSuccess: () => {
            setLoggedIn(true);
            setLoading(false);
          },
        })
      );
    }
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  return (
    <Modal modalRef={modalRef} onClose={handleOnClose} adjustToContentHeight>
      <Header
        right={
          <Text style={[FontStyles.Normal, styles.valid]} onPress={closeModal}>
            {t('common.close')}
          </Text>
        }
        center={
          <Text type="subtitle2">{t('settings.items.biometric.name')}</Text>
        }
      />
      <Column style={styles.container}>
        {!loggedIn ? (
          <>
            <PasswordInput
              error={error}
              value={password}
              onChangeText={setPassword}
              onSubmit={handleSubmit}
            />
            <RainbowButton
              text={t('common.continue')}
              loading={loading}
              onPress={handleSubmit}
              buttonStyle={styles.buttonStyle}
              disabled={!isValidPassword(password)}
            />
          </>
        ) : (
          <View style={styles.optionContainer}>
            <Text style={styles.option}>{t('common.biometricSignIn')}</Text>
            <Switch
              onValueChange={toggleSwitch}
              value={useBiometrics}
              trackColor={{ false: Colors.Gray.Pure }}
            />
          </View>
        )}
      </Column>
    </Modal>
  );
}

export default BiometricUnlock;
