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
import { Nullable } from '@/interfaces/general';
import { useAppDispatch } from '@/redux/hooks';
import { validatePem } from '@/redux/slices/keyring';

import CreateEditAccount from '../CreateEditAccount';
import styles from './styles';

interface Props {
  modalRef: RefObject<Modalize>;
  createImportRef: RefObject<Modalize>;
}

const getErrorMessage = (errorType: string) => {
  switch (errorType) {
    case 'invalid-key':
      return t('createImportAccount.invalidKey');
    default:
      return t('createImportAccount.addedAccount');
  }
};

function ImportKey({ createImportRef, modalRef }: Props) {
  const dispatch = useAppDispatch();
  const createEditAccount = useRef<Modalize>(null);

  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorType, setErrorType] = useState<Nullable<string>>(null);

  const disabled = key === '' || loading || !!errorType;

  const handleOnChangeKey = (value: string) => {
    if (errorType) {
      setErrorType(null);
    }
    setKey(value);
  };

  const handleBack = () => {
    modalRef?.current?.close();
  };

  const handleContinue = () => {
    setLoading(true);
    dispatch(
      validatePem({
        pem: key,
        onSuccess: () => {
          createEditAccount.current?.open();
          setLoading(false);
        },
        onFailure: (eType: string) => {
          setErrorType(eType);
          setLoading(false);
        },
      })
    );
  };

  return (
    <Modal
      adjustToContentHeight
      modalRef={modalRef}
      HeaderComponent={
        <Header
          left={<ActionButton onPress={handleBack} label={t('common.back')} />}
          center={<Text type="subtitle2">{t('common.importWallet')}</Text>}
        />
      }>
      <View style={styles.container}>
        <TextInput
          autoFocus
          value={key}
          autoCapitalize="none"
          placeholder={t('createImportAccount.importKey')}
          style={styles.inputStyle}
          onChangeText={handleOnChangeKey}
        />
        {errorType && (
          <Text type="caption" style={styles.error}>
            {getErrorMessage(errorType)}
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
        createImportModalRef={createImportRef}
      />
    </Modal>
  );
}

export default ImportKey;
