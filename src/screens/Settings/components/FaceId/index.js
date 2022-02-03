import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Text, Switch, View } from 'react-native';

import RainbowButton from '../../../../components/buttons/RainbowButton';
import PasswordInput from '../../../../components/common/PasswordInput';
import Column from '../../../../components/layout/Column';

import Header from '../../../../components/common/Header';
import Modal from '../../../../components/modal';
import useKeyring from '../../../../hooks/useKeyring';
import styles from './styles';

function FaceId({ modalRef }) {
  const { saveBiometrics, unlock, resetBiometrics } = useKeyring();
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
    const unlocked = await unlock(password);
    if (unlocked) {
      setLoggedIn(true);
    } else {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <Modal modalRef={modalRef} onClose={handleOnClose} adjustToContentHeight>
      <Header center={<Text style={styles.title}>Face ID</Text>} />
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
              disabled={!password || password.length < 12}
            />
          </>
        ) : (
          <View style={styles.optionContainer}>
            <Text style={styles.option}>Sign in with Face ID?</Text>
            <Switch onValueChange={toggleSwitch} value={useBiometrics} />
          </View>
        )}
      </Column>
    </Modal>
  );
}

export default FaceId;
