import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Keyboard } from 'react-native';

import RainbowButton from '../../components/buttons/RainbowButton';
import TextInput from '../../components/common/TextInput';
import UserIcon from '../../components/common/UserIcon';
import Header from '../../components/common/Header';
import { FontStyles } from '../../constants/theme';
import useAccounts from '../../hooks/useAccounts';
import EmojiSelector from '../EmojiSelector';
import Modal from '../../components/modal';
import styles from './styles';

const CreateEditAccount = ({ modalRef, account, accountsModalRef }) => {
  const editEmojiRef = useRef(null);
  const [accountName, setAccountName] = useState('');
  const [editTouched, setEditTouched] = useState(false);
  const [emoji, setEmoji] = useState('');

  const { onCreate, onEdit } = useAccounts();

  const onPress = () => {
    account
      ? onEdit({
          walletNumber: account.walletNumber,
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

  const getName = isSave =>
    isSave ? 'Save' : `${account ? 'Edit' : 'Create'} Account`;

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
            Close
          </Text>
        }
        left={
          <Text style={[FontStyles.Normal, styles.valid]} onPress={handleBack}>
            Back
          </Text>
        }
        center={<Text style={FontStyles.Subtitle2}>{getName()}</Text>}
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
                👈 Edit
              </Text>
            </View>
          )}
        </View>
        <TextInput
          autoFocus
          variant="text"
          maxLenght={22}
          value={accountName}
          placeholder="Account name"
          customStyle={styles.input}
          onChangeText={setAccountName}
        />
        <RainbowButton
          text={getName(account)}
          onPress={onPress}
          disabled={!accountName}
        />
        <EmojiSelector
          modalRef={editEmojiRef}
          onSave={setEmoji}
          emoji={emoji}
        />
      </View>
    </Modal>
  );
};

export default CreateEditAccount;
