import { t } from 'i18next';
import React, { RefObject, useRef } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { FileSystem } from 'react-native-file-access';
import { Modalize } from 'react-native-modalize';

import { GradientText, Header, Modal, Text } from '@/components/common';
import { useStateWithCallback } from '@/hooks/useStateWithCallback';

import CreateAccount from '../CreateEditAccount';
import ImportKey from '../ImportKey';
import styles from './styles';
import { Button, getCreateImportButtons } from './utils';

interface Props {
  modalRef: RefObject<Modalize>;
  accountsModal: RefObject<Modalize>;
}

function CreateImportAccount({ accountsModal, modalRef }: Props) {
  const [pemFile, setPemFile] = useStateWithCallback<string>('');
  const createAccountRef = useRef<Modalize>(null);
  const importKeyRef = useRef<Modalize>(null);

  const closeModal = () => {
    accountsModal?.current?.close();
  };

  const handleBack = () => {
    modalRef?.current?.close();
  };

  const openCreateAccountModal = () => {
    createAccountRef?.current?.open();
  };

  const openImportKeyModal = () => {
    importKeyRef?.current?.open();
  };

  const openFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: ['application/x-pem-file', '.pem'],
      });
      const stringifyPEM = await FileSystem.readFile(res.uri);
      setPemFile(stringifyPEM, openCreateAccountModal);
    } catch (e) {
      // TODO: Add toast to handle this error.
      console.log('Error opening .pem');
    }
  };

  const renderButton = ({ id, title, onPress, icon, colors }: Button) => (
    <TouchableOpacity key={id} onPress={onPress} style={styles.button}>
      <Image source={icon} />
      <GradientText type="subtitle3" colors={colors}>
        {title}
      </GradientText>
    </TouchableOpacity>
  );

  const buttons = getCreateImportButtons({
    openCreateAccountModal,
    openFile,
    openImportKeyModal,
  });

  return (
    <Modal adjustToContentHeight modalRef={modalRef}>
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
        center={
          <Text type="subtitle2">{t('accounts.createImportAccount')}</Text>
        }
      />
      <View style={styles.container}>{buttons.map(renderButton)}</View>
      <CreateAccount
        pem={pemFile}
        modalRef={createAccountRef}
        createImportModalRef={modalRef}
        accountsModalRef={accountsModal}
      />
      <ImportKey
        modalRef={importKeyRef}
        createImportRef={modalRef}
        accountsModalRef={accountsModal}
      />
    </Modal>
  );
}

export default CreateImportAccount;
