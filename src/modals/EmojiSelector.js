import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Header from '../components/common/Header';
import Modal from '../components/modal';
import UserIcon from '../components/common/UserIcon';
import RainbowButton from '../components/buttons/RainbowButton';
import EmojiSelector from '../components/common/EmojiSelector';
import { FontStyles } from '../constants/theme';

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
        <RainbowButton text="Save emoji" onPress={handleSave} />
        <EmojiSelector onSelect={setSelectedEmoji} />
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
