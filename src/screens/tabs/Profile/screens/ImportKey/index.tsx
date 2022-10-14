import { t } from 'i18next';
import React, { RefObject, useRef, useState } from 'react';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import RainbowButton from '@/components/buttons/RainbowButton';
import {
  ActionButton,
  Header,
  Modal,
  Text,
  TextInput,
} from '@/components/common';
import { useAppDispatch } from '@/redux/hooks';
import { validatePem } from '@/redux/slices/keyring';

import CreateEditAccount from '../CreateEditAccount';
import styles from './styles';

interface Props {
  modalRef: RefObject<Modalize>;
  createImportRef: RefObject<Modalize>;
  accountsModalRef: RefObject<Modalize>;
}

function ImportKey({ createImportRef, modalRef, accountsModalRef }: Props) {
  const createEditAccount = useRef<Modalize>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [key, setKey] = useState('');
  const dispatch = useAppDispatch();
  const disabled = key === '' || loading || error;

  const handleOnChangeKey = (value: string) => {
    if (error) {
      setError(false);
    }
    setKey(value);
  };

  const closeModal = () => {
    createImportRef?.current?.close();
    accountsModalRef?.current?.close();
  };

  const handleBack = () => {
    modalRef?.current?.close();
  };

  const handleContinue = () => {
    setLoading(true);
    dispatch(
      validatePem({
        pem: key,
        onSuccess: () => createEditAccount.current?.open(),
        onFailure: () => setError(true),
        onFinish: () => setLoading(false),
      })
    );
  };

  return (
    <Modal adjustToContentHeight modalRef={modalRef}>
      <Header
        right={<ActionButton onPress={closeModal} label={t('common.close')} />}
        left={<ActionButton onPress={handleBack} label={t('common.back')} />}
        center={<Text type="subtitle2">{t('common.importWallet')}</Text>}
      />
      <View style={styles.container}>
        <TextInput
          autoFocus
          value={key}
          autoCapitalize="none"
          placeholder={t('createImportAccount.importKey')}
          style={styles.inputStyle}
          onChangeText={handleOnChangeKey}
        />
        {error && (
          <Text type="caption" style={styles.error}>
            {t('createImportAccount.invalidKey')}
          </Text>
        )}
        <RainbowButton
          disabled={disabled}
          text={t('common.continue')}
          onPress={handleContinue}
          buttonStyle={styles.button}
        />
      </View>
      <CreateEditAccount
        pem={key}
        modalRef={createEditAccount}
        accountsModalRef={accountsModalRef}
        createImportModalRef={createImportRef}
      />
    </Modal>
  );
}

export default ImportKey;
