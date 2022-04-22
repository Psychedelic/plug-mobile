import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, Switch, View } from 'react-native';

import RainbowButton from '../../../../components/buttons/RainbowButton';
import PasswordInput from '../../../../components/common/PasswordInput';
import { validatePassword } from '../../../../redux/slices/keyring';
import { isValidPassword } from '../../../../constants/general';
import Column from '../../../../components/layout/Column';
import Header from '../../../../components/common/Header';
import { FontStyles } from '../../../../constants/theme';
import useKeychain from '../../../../hooks/useKeychain';
import Modal from '../../../../components/modal';
import styles from './styles';

function BiometricUnlock({ modalRef }) {
  const dispatch = useDispatch();
  const { saveBiometrics, resetBiometrics } = useKeychain();
  const hasBiometrics = useSelector(state => state.user.usingBiometrics);
  const [useBiometrics, setUseBiometrics] = useState(hasBiometrics);

  const [password, setPassword] = useState(null);
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
    setPassword(null);
    setError(false);
    setLoggedIn(false);
    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
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
      }),
    );
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  return (
    <Modal modalRef={modalRef} onClose={handleOnClose} adjustToContentHeight>
      <Header
        right={
          <Text style={[FontStyles.Normal, styles.valid]} onPress={closeModal}>
            Close
          </Text>
        }
        center={<Text style={styles.title}>Biometric Unlock</Text>}
      />
      <Column style={styles.container}>
        {!loggedIn ? (
          <>
            <PasswordInput
              error={error}
              password={password}
              onChange={setPassword}
            />
            <RainbowButton
              text="Continue"
              loading={loading}
              onPress={handleSubmit}
              buttonStyle={styles.buttonStyle}
              disabled={!isValidPassword(password)}
            />
          </>
        ) : (
          <View style={styles.optionContainer}>
            <Text style={styles.option}>Sign in with biometrics?</Text>
            <Switch onValueChange={toggleSwitch} value={useBiometrics} />
          </View>
        )}
      </Column>
    </Modal>
  );
}

export default BiometricUnlock;
