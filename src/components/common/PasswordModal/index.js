import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import { useDispatch } from 'react-redux';

import Header from '@/commonComponents/Header';
import Modal from '@/commonComponents/Modal';
import PasswordInput from '@/commonComponents/PasswordInput';
import RainbowButton from '@/components/buttons/RainbowButton';
import { Column } from '@/layout';
import { validatePassword } from '@/redux/slices/keyring';

import styles from './styles';

const PasswordModal = ({
  modalRef,
  title,
  handleClose = () => {},
  handleSubmit,
}) => {
  const { t } = useTranslation();
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
      })
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
      <Header center={<Text style={styles.title}>{title}</Text>} />
      <Column style={styles.container}>
        <PasswordInput
          error={error}
          password={password}
          onChange={setPassword}
        />
        <RainbowButton
          buttonStyle={styles.buttonStyle}
          text={t('common.continue')}
          loading={loading}
          onPress={validatedSubmit}
          disabled={loading}
        />
      </Column>
    </Modal>
  );
};

export default PasswordModal;
