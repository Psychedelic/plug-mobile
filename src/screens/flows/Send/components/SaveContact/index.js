import emojis from 'emoji-datasource';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { charFromEmojiObject } from '@/commonComponents/EmojiSelector/utils';
import Header from '@/commonComponents/Header';
import Modal from '@/commonComponents/Modal';
import TextInput from '@/commonComponents/TextInput';
import RainbowButton from '@/components/buttons/RainbowButton';
import Text from '@/components/common/Text';
import { FontStyles } from '@/constants/theme';
import { addContact } from '@/redux/slices/user';

import styles from './styles';

function SaveContact({ modalRef, onClose, id }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { contactsLoading } = useSelector(state => state.user);
  const [name, setName] = useState('');
  const title = t('saveContact.title');

  const handleClose = () => {
    setName('');
    onClose?.();
  };

  const handleSubmit = () => {
    const randomEmoji = charFromEmojiObject(
      emojis[Math.floor(Math.random() * emojis.length)]
    );
    dispatch(
      addContact({
        contact: {
          id,
          name,
          image: randomEmoji,
        },
        onFinish: () => modalRef.current?.close(),
      })
    );
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
        center={<Text type="subtitle2">{title}</Text>}
      />
      <View style={styles.container}>
        <TextInput
          autoFocus
          value={name}
          maxLength={22}
          placeholder={t('saveContact.namePlaceholder')}
          onChangeText={setName}
          style={styles.input}
        />
        <RainbowButton
          text={title}
          onPress={handleSubmit}
          disabled={!name}
          loading={contactsLoading}
        />
      </View>
    </Modal>
  );
}

export default SaveContact;
