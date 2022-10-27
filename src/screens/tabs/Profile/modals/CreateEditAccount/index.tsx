import { t } from 'i18next';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { Keyboard, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import Header from '@/commonComponents/Header';
import Modal from '@/commonComponents/Modal';
import TextInput from '@/commonComponents/TextInput';
import UserIcon from '@/commonComponents/UserIcon';
import RainbowButton from '@/components/buttons/RainbowButton';
import { ActionButton } from '@/components/common';
import Text from '@/components/common/Text';
import { FontStyles } from '@/constants/theme';
import useCustomToast from '@/hooks/useCustomToast';
import { Wallet } from '@/interfaces/redux';
import { useAppDispatch } from '@/redux/hooks';
import {
  createSubaccount,
  editSubaccount,
  importAccountFromPem,
} from '@/redux/slices/keyring';

import EditEmoji from '../EditEmoji';
import styles from './styles';

interface Props {
  modalRef: RefObject<Modalize>;
  accountsModalRef?: RefObject<Modalize>;
  account?: Wallet;
  pem?: string;
  createImportModalRef?: RefObject<Modalize>;
}

const CreateEditAccount = ({
  modalRef,
  account,
  accountsModalRef,
  pem,
  createImportModalRef,
}: Props) => {
  const toast = useCustomToast();
  const editEmojiRef = useRef<Modalize>(null);
  const [accountName, setAccountName] = useState('');
  const [editTouched, setEditTouched] = useState(false);
  const [emoji, setEmoji] = useState('');
  const dispatch = useAppDispatch();

  const title = account ? t('accounts.edit') : t('accounts.create');
  const nameAndIcon = {
    name: accountName,
    icon: emoji,
  };

  const onPress = () => {
    account
      ? dispatch(
          editSubaccount({
            walletId: account.walletId,
            ...nameAndIcon,
          })
        )
      : pem
      ? dispatch(
          importAccountFromPem({
            ...nameAndIcon,
            pem,
            onFailure: () => {
              toast.showError(
                t('accounts.errorImport.title'),
                t('accounts.errorImport.message')
              );
            },
          })
        )
      : dispatch(createSubaccount(nameAndIcon));

    resetState();
    if (createImportModalRef) {
      createImportModalRef.current?.close();
    }
    modalRef.current?.close();
  };

  const resetState = () => {
    setAccountName('');
    setEmoji('');
  };

  const onEditEmoji = () => {
    Keyboard.dismiss();
    editEmojiRef?.current?.open();
    setEditTouched(true);
  };

  useEffect(() => {
    if (account) {
      setAccountName(account.name);
      setEmoji(account.icon!);
    } else {
      resetState();
    }
  }, [account]);

  const closeModal = () => {
    accountsModalRef?.current?.close();
  };

  const handleBack = () => {
    modalRef?.current?.close();
  };

  const handleClose = () => {
    if (!account) {
      resetState();
    }
  };

  return (
    <Modal adjustToContentHeight modalRef={modalRef} onClose={handleClose}>
      <Header
        right={<ActionButton onPress={closeModal} label={t('common.close')} />}
        left={<ActionButton onPress={handleBack} label={t('common.back')} />}
        center={<Text type="subtitle2">{title}</Text>}
      />
      <View style={styles.content}>
        <View>
          <UserIcon
            icon={emoji}
            size="extralarge"
            style={styles.icon}
            onPress={onEditEmoji}
          />
          {!editTouched && (
            <View style={styles.toolTip}>
              <Text style={[FontStyles.Small, styles.toolTipText]}>
                {t('accounts.editButton')}
              </Text>
            </View>
          )}
        </View>
        <TextInput
          autoFocus
          maxLength={22}
          value={accountName}
          placeholder={t('accounts.accountNamePlaceholder')}
          style={styles.input}
          onChangeText={setAccountName}
        />
        <RainbowButton text={title} onPress={onPress} disabled={!accountName} />
        <EditEmoji modalRef={editEmojiRef} onSave={setEmoji} emoji={emoji} />
      </View>
    </Modal>
  );
};

export default CreateEditAccount;
