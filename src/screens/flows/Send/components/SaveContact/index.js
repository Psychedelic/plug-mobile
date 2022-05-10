import emojis from 'emoji-datasource';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { charFromEmojiObject } from '@/commonComponents/EmojiSelector/utils';
import Header from '@/commonComponents/Header';
import Modal from '@/commonComponents/Modal';
import TextInput from '@/commonComponents/TextInput';
import RainbowButton from '@/components/buttons/RainbowButton';
import { FontStyles } from '@/constants/theme';
import useContacts from '@/hooks/useContacts';

import styles from './styles';

function SaveContact({ modalRef, onClose, id }) {
  const { onCreate } = useContacts();
  const [name, setName] = useState('');
  const title = 'Save Contact';

  const handleClose = () => {
    setName('');
    if (onClose) {
      onClose();
    }
  };

  const handleSubmit = () => {
    const randomEmoji = charFromEmojiObject(
      emojis[Math.floor(Math.random() * emojis.length)],
    );
    onCreate({
      id,
      name,
      image: randomEmoji,
    });

    modalRef.current?.close();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  return (
    <Modal modalRef={modalRef} adjustToContentHeight onClose={handleClose}>
      <Header
        right={
          <Text style={[FontStyles.Normal, styles.valid]} onPress={closeModal}>
            Close
          </Text>
        }
        center={<Text style={FontStyles.Subtitle2}>{title}</Text>}
      />
      <View style={styles.container}>
        <TextInput
          autoFocus
          value={name}
          variant="text"
          maxLenght={22}
          placeholder="Name"
          onChangeText={setName}
          customStyle={styles.input}
        />
        <RainbowButton text={title} onPress={handleSubmit} disabled={!name} />
      </View>
    </Modal>
  );
}

export default SaveContact;
