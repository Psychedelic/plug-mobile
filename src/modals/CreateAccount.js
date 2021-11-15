<<<<<<< HEAD:src/modals/CreateEditAccount.js
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import Header from '../../../components/common/Header';
import Modal from '../../../components/modal';
import { FontStyles } from '../../../constants/theme';
import { View, Text } from 'react-native';
import UserIcon from '../../../components/common/UserIcon';
import TextInput from '../../../components/common/TextInput';
import RainbowButton from '../../../components/buttons/RainbowButton';
=======
import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Header from '../components/common/Header';
import Modal from '../components/modal';
import { FontStyles } from '../constants/theme';
import UserIcon from '../components/common/UserIcon';
import TextInput from '../components/common/TextInput';
import RainbowButton from '../components/buttons/RainbowButton';
>>>>>>> 0f3af64147b233f5923b978113b28a7618718abb:src/modals/CreateAccount.js
import EmojiSelector from './EmojiSelector';
import useAccounts from '../../../hooks/useAccounts';

<<<<<<< HEAD:src/modals/CreateEditAccount.js
const CreateEditAccount = ({ modalRef, handleClose, account, ...props }) => {
=======
const CreateAccount = ({ title, modalRef, handleClose, ...props }) => {
>>>>>>> 0f3af64147b233f5923b978113b28a7618718abb:src/modals/CreateAccount.js
  const editEmojiRef = useRef(null);
  const [accountName, setAccountName] = useState(null);
  const [emoji, setEmoji] = useState('')

  const { onCreate, onEdit } = useAccounts();

  const onPress = () => {

    console.log('onpress', account)
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

    modalRef.current?.close();
  };

  const onEditEmoji = () => {
    editEmojiRef?.current.open();
  };

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
      onClose={handleClose}
      {...props}>
      <Header center={<Text style={FontStyles.Subtitle2}>{title}</Text>} />
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
          text="Create account"
          onPress={onPress}
          disabled={!accountName}
        />

        <EmojiSelector
          modalRef={editEmojiRef}
          onSave={setEmoji}
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
