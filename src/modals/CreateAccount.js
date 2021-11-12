import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Header from '../components/common/Header';
import Modal from '../components/modal';
import { FontStyles } from '../constants/theme';
import UserIcon from '../components/common/UserIcon';
import TextInput from '../components/common/TextInput';
import RainbowButton from '../components/buttons/RainbowButton';
import EmojiSelector from './EmojiSelector';

const CreateAccount = ({ title, modalRef, handleClose, ...props }) => {
  const editEmojiRef = useRef(null);
  const [accountName, setAccountName] = useState(null);

  const onCreate = () => {
    modalRef?.current.close();
  };

  const onEditEmoji = () => {
    editEmojiRef?.current.open();
  };

  return (
    <Modal
      adjustToContentHeight
      modalRef={modalRef}
      onClose={handleClose}
      {...props}>
      <Header center={<Text style={FontStyles.Subtitle2}>{title}</Text>} />
      <View style={styles.content}>
        <UserIcon
          icon="🔥"
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
          onPress={onCreate}
          disabled={!accountName}
        />

        <EmojiSelector modalRef={editEmojiRef} />
      </View>
    </Modal>
  );
};

export default CreateAccount;

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
