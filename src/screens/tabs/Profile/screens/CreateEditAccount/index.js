import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, View } from 'react-native';

import Header from '@/commonComponents/Header';
import Modal from '@/commonComponents/Modal';
import TextInput from '@/commonComponents/TextInput';
import UserIcon from '@/commonComponents/UserIcon';
import RainbowButton from '@/components/buttons/RainbowButton';
import Text from '@/components/common/Text';
import { FontStyles } from '@/constants/theme';
import useAccounts from '@/hooks/useAccounts';

import EditEmoji from '../EditEmoji';
import styles from './styles';

const CreateEditAccount = ({ modalRef, account, accountsModalRef }) => {
  const { t } = useTranslation();
  const editEmojiRef = useRef(null);
  const [accountName, setAccountName] = useState('');
  const [editTouched, setEditTouched] = useState(false);
  const [emoji, setEmoji] = useState('');

  const { onCreate, onEdit } = useAccounts();

  const onPress = () => {
    account
      ? onEdit({
          walletId: account.walletId,
          name: accountName,
          icon: emoji,
        })
      : onCreate({
          name: accountName,
          icon: emoji,
        });

    resetState();
    modalRef.current?.close();
  };

  const resetState = () => {
    setAccountName('');
    setEmoji('');
  };

  const onEditEmoji = () => {
    Keyboard.dismiss();
    editEmojiRef?.current.open();
    setEditTouched(true);
  };

  const getName = useCallback(
    isSave =>
      isSave
        ? t('accounts.save')
        : account
        ? t('accounts.edit')
        : t('accounts.create'),
    [account]
  );

  useEffect(() => {
    if (account) {
      setAccountName(account.name);
      setEmoji(account.icon);
    } else {
      resetState();
    }
  }, [account]);

  const closeModal = () => {
    accountsModalRef?.current.close();
  };

  const handleBack = () => {
    modalRef?.current.close();
  };

  const handleClose = () => {
    if (!account) {
      resetState();
    }
  };

  return (
    <Modal adjustToContentHeight modalRef={modalRef} onClose={handleClose}>
      <Header
        right={
          <Text style={[FontStyles.Normal, styles.valid]} onPress={closeModal}>
            {t('common.close')}
          </Text>
        }
        left={
          <Text style={[FontStyles.Normal, styles.valid]} onPress={handleBack}>
            {t('common.back')}
          </Text>
        }
        center={<Text type="subtitle2">{getName()}</Text>}
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
        <RainbowButton
          text={getName(account)}
          onPress={onPress}
          disabled={!accountName}
        />
        <EditEmoji modalRef={editEmojiRef} onSave={setEmoji} emoji={emoji} />
      </View>
    </Modal>
  );
};

export default CreateEditAccount;
