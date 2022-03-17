import { StyleSheet, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';

import RainbowButton from '../components/buttons/RainbowButton';
import EmojiSelector from '../components/common/EmojiSelector';
import UserIcon from '../components/common/UserIcon';
import Header from '../components/common/Header';
import { FontStyles } from '../constants/theme';
import Modal from '../components/modal';

const EditEmoji = ({ modalRef, onSave, emoji }) => {
  const [selectedEmoji, setSelectedEmoji] = useState('');

  const handleSave = () => {
    onSave(selectedEmoji);
    setSelectedEmoji('');
    modalRef?.current.close();
  };

  useEffect(() => {
    if (emoji) {
      setSelectedEmoji(emoji);
    }
  }, [emoji]);

  return (
    <Modal adjustToContentHeight modalRef={modalRef}>
      <Header center={<Text style={FontStyles.Subtitle2}>Set Emoji</Text>} />
      <View style={styles.content}>
        <UserIcon icon={selectedEmoji} size="extralarge" style={styles.icon} />
        <EmojiSelector onSelect={setSelectedEmoji} />
        <RainbowButton text="Save emoji" onPress={handleSave} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 35,
    justifyContent: 'space-between',
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 25,
  },
});

export default EditEmoji;
