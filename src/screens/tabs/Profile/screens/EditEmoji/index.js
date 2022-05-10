import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import EmojiSelector from '@/commonComponents/EmojiSelector';
import Header from '@/commonComponents/Header';
import Modal from '@/commonComponents/Modal';
import UserIcon from '@/commonComponents/UserIcon';
import RainbowButton from '@/components/buttons/RainbowButton';
import { FontStyles } from '@/constants/theme';

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
