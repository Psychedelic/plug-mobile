import { t } from 'i18next';
import React, { RefObject, useRef } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { FileSystem } from 'react-native-file-access';
import { Modalize } from 'react-native-modalize';

import { GradientText, Header, Modal, Text } from '@/components/common';
import { isIos } from '@/constants/platform';
import useCustomToast from '@/hooks/useCustomToast';
import { useStateWithCallback } from '@/hooks/useStateWithCallback';
import { useAppDispatch } from '@/redux/hooks';
import { validatePem } from '@/redux/slices/keyring';

import { getPemImportError } from '../../utils';
import CreateAccount from '../CreateEditAccount';
import ImportKey from '../ImportKey';
import styles from './styles';
import { Button, getCreateImportButtons } from './utils';

interface Props {
  modalRef: RefObject<Modalize>;
}

function CreateImportAccount({ modalRef }: Props) {
  const [pemFile, setPemFile] = useStateWithCallback<string>('');
  const createAccountRef = useRef<Modalize>(null);
  const importKeyRef = useRef<Modalize>(null);
  const toast = useCustomToast();
  const dispatch = useAppDispatch();

  const openCreateAccountModal = () => {
    createAccountRef?.current?.open();
  };

  const openImportKeyModal = () => {
    importKeyRef?.current?.open();
  };

  const openFile = async () => {
    const type = isIos
      ? 'public.x509-certificate'
      : ['.pem', 'application/x-pem-file'];
    DocumentPicker.pickSingle({ type })
      .then(async res => {
        const stringifyPEM = await FileSystem.readFile(res.uri);
        dispatch(
          validatePem({
            pem: stringifyPEM,
            onSuccess: () => {
              setPemFile(stringifyPEM, openCreateAccountModal);
            },
            onFailure: (eType: string) => {
              toast.showError(
                t('accounts.errorImport.title'),
                getPemImportError(eType)
              );
              modalRef.current?.close();
            },
          })
        );
      })
      .catch(() => {});
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
    openImportKeyModal,
    openFile,
  });

  const resetState = () => {
    setPemFile('');
  };

  return (
    <Modal
      adjustToContentHeight
      modalRef={modalRef}
      onClosed={resetState}
      HeaderComponent={
        <Header
          center={
            <Text type="subtitle2">{t('accounts.createImportAccount')}</Text>
          }
        />
      }>
      <View style={styles.container}>{buttons.map(renderButton)}</View>
      <CreateAccount
        pem={pemFile}
        modalRef={createAccountRef}
        createImportModalRef={modalRef}
      />
      <ImportKey modalRef={importKeyRef} createImportRef={modalRef} />
    </Modal>
  );
}

export default CreateImportAccount;
