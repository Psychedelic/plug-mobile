import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import RainbowButton from '../components/buttons/RainbowButton';
import TextInput from '../components/common/TextInput';
import UserIcon from '../components/common/UserIcon';
import Header from '../components/common/Header';
import { FontStyles } from '../constants/theme';
import useAccounts from '../hooks/useAccounts';
import EmojiSelector from './EmojiSelector';
import Modal from '../components/modal';

const CreateEditAccount = ({ modalRef, account, ...props }) => {
  const editEmojiRef = useRef(null);
  const [accountName, setAccountName] = useState('');
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
    editEmojiRef?.current.open();
  };

  const getName = () => `${account ? 'Edit' : 'Create'} Account`;

  useEffect(() => {
    if (account) {
      setAccountName(account.name);
      setEmoji(account.icon);
    }
  }, [account]);

  return (
    <Modal
      adjustToContentHeight
      modalRef={modalRef}
      onClose={resetState}
      {...props}>
      <Header center={<Text style={FontStyles.Subtitle2}>{getName()}</Text>} />
      <View style={styles.content}>
        <UserIcon
          icon={emoji}
          size="extralarge"
          style={styles.icon}
          onPress={onEditEmoji}
        />

        <TextInput
          placeholder="Account name"
          variant="text"
          value={accountName}
          onChangeText={setAccountName}
          autoFocus
          customStyle={styles.input}
        />

        <RainbowButton
          text={getName()}
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

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 35,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 25,
  },
  input: {
    marginBottom: 25,
  },
});
