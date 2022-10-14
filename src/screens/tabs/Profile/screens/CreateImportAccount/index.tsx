import { t } from 'i18next';
import React, { RefObject, useRef } from 'react';
import { Image, Platform, TouchableOpacity, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { FileSystem } from 'react-native-file-access';
import { Modalize } from 'react-native-modalize';

import {
  ActionButton,
  GradientText,
  Header,
  Modal,
  Text,
} from '@/components/common';
import { isIos } from '@/constants/platform';
import { useStateWithCallback } from '@/hooks/useStateWithCallback';

import CreateAccount from '../CreateEditAccount';
import ImportKey from '../ImportKey';
import styles from './styles';
import { Button, getCreateImportButtons } from './utils';

interface Props {
  modalRef: RefObject<Modalize>;
  accountsModalRef: RefObject<Modalize>;
}

function CreateImportAccount({ accountsModalRef, modalRef }: Props) {
  const [pemFile, setPemFile] = useStateWithCallback<string>('');
  const createAccountRef = useRef<Modalize>(null);
  const importKeyRef = useRef<Modalize>(null);

  const closeModal = () => {
    accountsModalRef?.current?.close();
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
      const type = isIos
        ? DocumentPicker.types.allFiles
        : ['.pem', 'application/x-pem-file'];
      const res = await DocumentPicker.pickSingle({ type });

      if (
        !isIos ||
        res.type?.includes('application/x-x509-ca-cert') ||
        res.type?.includes('application/x-x509-user-cert')
      ) {
        const stringifyPEM = await FileSystem.readFile(res.uri);
        setPemFile(stringifyPEM, openCreateAccountModal);
      } else {
        // TODO: Add toast to handle this error. Selected file is not compatible with .pem
      }
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
        right={<ActionButton onPress={closeModal} label={t('common.close')} />}
        left={<ActionButton onPress={handleBack} label={t('common.back')} />}
        center={
          <Text type="subtitle2">{t('accounts.createImportAccount')}</Text>
        }
      />
      <View style={styles.container}>{buttons.map(renderButton)}</View>
      <CreateAccount
        pem={pemFile}
        modalRef={createAccountRef}
        createImportModalRef={modalRef}
        accountsModalRef={accountsModalRef}
      />
      <ImportKey
        modalRef={importKeyRef}
        createImportRef={modalRef}
        accountsModalRef={accountsModalRef}
      />
    </Modal>
  );
}

export default CreateImportAccount;
