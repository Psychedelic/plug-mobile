import { t } from 'i18next';
import React, { RefObject, useRef } from 'react';
import {
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { FileSystem } from 'react-native-file-access';
import { Modalize } from 'react-native-modalize';

import { GradientText, Header, Modal, Text } from '@/components/common';
import { useStateWithCallback } from '@/hooks/useStateWithCallback';

import CreateAccount from '../CreateEditAccount';
import ImportKey from '../ImportKey';
import createAccountIcon from './assets/createIcon.png';
import pemFileIcon from './assets/pemFileIcon.png';
import privateKeyIcon from './assets/privateKeyIcon.png';
import styles from './styles';

interface Button {
  id: string;
  title: string;
  onPress: () => void;
  icon: ImageSourcePropType;
  colors: string[];
}

interface Props {
  modalRef: RefObject<Modalize>;
  accountsModal: RefObject<Modalize>;
}

function CreateImportAccount({ accountsModal, modalRef }: Props) {
  const createAccountRef = useRef<Modalize>(null);
  const importKeyRef = useRef<Modalize>(null);
  const [pemFile, setPemFile] = useStateWithCallback<string>('');

  const closeModal = () => {
    accountsModal?.current?.close();
  };

  const handleBack = () => {
    modalRef?.current?.close();
  };

  const openCreateAccountModal = () => createAccountRef?.current?.open();

  const handleOpenFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: ['application/x-pem-file', '.pem'],
      });
      const stringifyPEM = await FileSystem.readFile(res.uri);
      setPemFile(stringifyPEM, openCreateAccountModal);
    } catch (e) {
      console.log('Error opening .pem');
    }
  };

  const BUTTONS = [
    {
      id: 'create',
      title: 'Create',
      onPress: openCreateAccountModal,
      icon: createAccountIcon,
      colors: ['#00E8FF', '#44DC45'],
    },
    {
      id: 'import-key',
      title: 'Private Key',
      onPress: () => importKeyRef?.current?.open(),
      icon: privateKeyIcon,
      colors: ['#FB5DC3', '#FDB943'],
    },
    {
      id: 'import-pem',
      title: 'PEM file',
      onPress: handleOpenFile,
      icon: pemFileIcon,
      colors: ['#36C3E9', '#CF6ED3'],
    },
  ];

  const renderButton = ({ id, title, onPress, icon, colors }: Button) => (
    <TouchableOpacity key={id} onPress={onPress} style={styles.button}>
      <Image source={icon} />
      <GradientText type="subtitle3" colors={colors}>
        {title}
      </GradientText>
    </TouchableOpacity>
  );

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
        center={<Text type="subtitle2">{'Create/Import Account'}</Text>}
      />
      <View style={styles.container}>{BUTTONS.map(renderButton)}</View>
      <CreateAccount
        modalRef={createAccountRef}
        accountsModalRef={accountsModal}
        account={null}
        pem={pemFile}
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
