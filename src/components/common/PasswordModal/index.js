import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Text } from 'react-native';

import RainbowButton from '@components/buttons/RainbowButton';
import PasswordInput from '@commonComponents/PasswordInput';
import { validatePassword } from '@redux/slices/keyring';
import Header from '@commonComponents/Header';
import Modal from '@commonComponents/Modal';
import { Column } from '@layout';

import styles from './styles';

const PasswordModal = ({ modalRef, handleClose = () => {}, handleSubmit }) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const validatedSubmit = async () => {
    setLoading(true);
    dispatch(
      validatePassword({
        password,
        onSuccess: () => {
          handleSubmit();
          handleClose();
          setLoading(false);
          modalRef.current.close();
        },
        onError: () => {
          setError(true);
          setLoading(false);
        },
      }),
    );
  };

  const handleOnClose = () => {
    handleClose();
    clearState();
  };

  const clearState = () => {
    setError(false);
    setLoading(false);
    setPassword('');
  };

  useEffect(() => {
    return () => clearState();
  }, []);

  return (
    <Modal modalRef={modalRef} onClose={handleOnClose} adjustToContentHeight>
      <Header center={<Text style={styles.title}>Enter your password</Text>} />
      <Column style={styles.container}>
        <PasswordInput
          error={error}
          password={password}
          onChange={setPassword}
        />
        <RainbowButton
          buttonStyle={styles.buttonStyle}
          text="Continue"
          loading={loading}
          onPress={validatedSubmit}
          disabled={loading}
        />
      </Column>
    </Modal>
  );
};

export default PasswordModal;
