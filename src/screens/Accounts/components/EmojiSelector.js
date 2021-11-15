import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Header from '../../../components/common/Header';
import Modal from '../../../components/modal';
import UserIcon from '../../../components/common/UserIcon';
import RainbowButton from '../../../components/buttons/RainbowButton';
import EmojiSelector from '../../../components/common/EmojiSelector';
import { FontStyles } from '../../../constants/theme';

const EditEmoji = ({ modalRef, onSave }) => {
  const [selectedEmoji, setSelectedEmoji] = useState('');

  const handleSave = () => {
    onSave(selectedEmoji);
    modalRef?.current.close();
  };

  return (
    <Modal adjustToContentHeight modalRef={modalRef}>
      <Header center={<Text style={FontStyles.Subtitle2}>Set Emoji</Text>} />
      <View style={styles.content}>
        <UserIcon icon={selectedEmoji} size="extralarge" style={styles.icon} />
        <RainbowButton text="Save emoji" onPress={handleSave} />
        <EmojiSelector onSelect={setSelectedEmoji} />
      </View>
    </Modal>
  );
};

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
});

export default EditEmoji;
