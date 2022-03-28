import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Text } from 'react-native';

import { validatePassword } from '../../redux/slices/keyring';
import RainbowButton from '../../buttons/RainbowButton';
import PasswordInput from '../PasswordInput';
import Column from '../../layout/Column';
import Modal from '../../modal';
import Header from '../Header';
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
