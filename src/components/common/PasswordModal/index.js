import React, { useMemo, useState } from 'react';
import { Text } from 'react-native';
import { useDispatch } from 'react-redux';

import { isValidPassword } from '../../../constants/general';
import { unlock } from '../../../redux/slices/keyring';
import RainbowButton from '../../buttons/RainbowButton';
import Column from '../../layout/Column';
import Modal from '../../modal';
import Header from '../Header';
import PasswordInput from '../PasswordInput';

import styles from './styles';

const PasswordModal = ({ modalRef, handleClose = () => {}, handleSubmit }) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const validatedSubmit = async () => {
    setLoading(true);
    dispatch(
      unlock({
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
  return (
    <Modal modalRef={modalRef} onClose={handleClose} adjustToContentHeight>
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
