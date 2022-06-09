import emojis from 'emoji-datasource';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { charFromEmojiObject } from '@/commonComponents/EmojiSelector/utils';
import Header from '@/commonComponents/Header';
import Modal from '@/commonComponents/Modal';
import TextInput from '@/commonComponents/TextInput';
import RainbowButton from '@/components/buttons/RainbowButton';
import { FontStyles } from '@/constants/theme';
import { addContact } from '@/redux/slices/user';

import styles from './styles';

function SaveContact({ modalRef, onClose, id }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const title = t('saveContact.title');

  const handleClose = () => {
    setName('');
    if (onClose) {
      onClose();
    }
  };

  const handleSubmit = () => {
    const randomEmoji = charFromEmojiObject(
      emojis[Math.floor(Math.random() * emojis.length)]
    );
    dispatch(
      addContact({
        id,
        name,
        image: randomEmoji,
      })
    );

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
            {t('common.close')}
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
          placeholder={t('saveContact.namePlaceholder')}
          onChangeText={setName}
          customStyle={styles.input}
        />
        <RainbowButton text={title} onPress={handleSubmit} disabled={!name} />
      </View>
    </Modal>
  );
}

export default SaveContact;
