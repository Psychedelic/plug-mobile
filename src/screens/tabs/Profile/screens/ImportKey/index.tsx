import { t } from 'i18next';
import React, { RefObject, useRef, useState } from 'react';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import RainbowButton from '@/components/buttons/RainbowButton';
import { Header, Modal, Text, TextInput } from '@/components/common';

import CreateEditAccount from '../CreateEditAccount';
import styles from './styles';

interface Props {
  modalRef: RefObject<Modalize>;
  createImportRef: RefObject<Modalize>;
  accountsModalRef: RefObject<Modalize>;
}

function ImportKey({ createImportRef, modalRef, accountsModalRef }: Props) {
  const createEditAccount = useRef<Modalize>(null);
  const [key, setKey] = useState('');

  const handleOnChangeKey = (value: string) => setKey(value);

  const closeModal = () => {
    accountsModalRef?.current?.close();
    createImportRef?.current?.close();
  };

  const handleBack = () => {
    modalRef?.current?.close();
  };

  const handleContinue = () => {
    createEditAccount.current?.open();
  };

  return (
    <Modal adjustToContentHeight modalRef={modalRef} onClose={() => {}}>
      <Header
        right={
          <Text style={styles.headerAction} onPress={closeModal}>
            {t('common.close')}
          </Text>
        }
        left={
          <Text style={styles.headerAction} onPress={handleBack}>
            {t('common.back')}
          </Text>
        }
        center={<Text type="subtitle2">{'Import Wallet'}</Text>}
      />
      <View style={styles.container}>
        <TextInput
          autoFocus
          value={key}
          autoCapitalize="none"
          placeholder={'Private Key'}
          style={styles.inputStyle}
          onChangeText={handleOnChangeKey}
        />
        <RainbowButton
          disabled={key === ''}
          text="Continue"
          onPress={handleContinue}
        />
      </View>
      <CreateEditAccount
        pem={key}
        modalRef={createEditAccount}
        accountsModalRef={accountsModalRef}
      />
    </Modal>
  );
}

export default ImportKey;
