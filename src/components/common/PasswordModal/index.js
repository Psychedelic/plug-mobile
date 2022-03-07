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

const PasswordModal = ({ modalRef, handleClose, handleSubmit, loading }) => {
  const [password, setPassword] = useState('');
  const error = useMemo(() => !isValidPassword(password), [password]);
  const dispatch = useDispatch();
  const validatedSubmit = async () => {
    dispatch(
      unlock({
        password,
        onSuccess: () => {
          handleSubmit();
          handleClose();
          modalRef.current.close();
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
          disabled={isValidPassword(password)}
        />
      </Column>
    </Modal>
  );
};

export default PasswordModal;
