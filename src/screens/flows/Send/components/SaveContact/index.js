import { Text, View } from 'react-native';
import React, { useState } from 'react';
import emojis from 'emoji-datasource';

import { charFromEmojiObject } from '../../../../components/common/EmojiSelector/utils';
import RainbowButton from '../../../../components/buttons/RainbowButton';
import TextInput from '../../../../components/common/TextInput';
import Header from '../../../../components/common/Header';
import { FontStyles } from '../../../../constants/theme';
import useContacts from '../../../../hooks/useContacts';
import Modal from '../../../../components/modal';
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
