import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import RainbowButton from '@components/buttons/RainbowButton';
import EmojiSelector from '@commonComponents/EmojiSelector';
import UserIcon from '@commonComponents/UserIcon';
import Header from '@commonComponents/Header';
import { FontStyles } from '@constants/theme';
import Modal from '@components/modal';

import styles from './styles';

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

export default EditEmoji;
