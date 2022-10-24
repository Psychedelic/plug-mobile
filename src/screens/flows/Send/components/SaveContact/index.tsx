import emojis from 'emoji-datasource';
import { t } from 'i18next';
import React, { RefObject, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { charFromEmojiObject } from '@/commonComponents/EmojiSelector/utils';
import Header from '@/commonComponents/Header';
import Modal from '@/commonComponents/Modal';
import TextInput from '@/commonComponents/TextInput';
import RainbowButton from '@/components/buttons/RainbowButton';
import Text from '@/components/common/Text';
import { FontStyles } from '@/constants/theme';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addContact } from '@/redux/slices/user';

import styles from './styles';

interface Props {
  modalRef: RefObject<Modalize>;
  id: string;
}

function SaveContact({ modalRef, id }: Props) {
  const dispatch = useAppDispatch();
  const { contactsLoading, contacts } = useAppSelector(state => state.user);

  const [error, setError] = useState<boolean>(false);
  const [name, setName] = useState<string>('');

  const savedContactName = contacts.find(c => c.name === name);
  const title = t('saveContact.title');

  useEffect(() => {
    if (savedContactName) {
      setError(true);
    } else {
      setError(false);
    }
  }, [savedContactName]);

  const handleClose = () => {
    setName('');
    setError(false);
  };

  const handleOnChange = (text: string) => {
    setError(false);
    setName(text);
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
          autoCapitalize="words"
          maxLength={22}
          placeholder={t('saveContact.namePlaceholder')}
          onChangeText={handleOnChange}
        />
        {error && (
          <Text type="caption" style={styles.errorMessage}>
            {t('contacts.nameTaken')}
          </Text>
        )}
        <RainbowButton
          text={title}
          onPress={handleSubmit}
          disabled={!name || error}
          loading={contactsLoading}
          buttonStyle={styles.button}
        />
      </View>
    </Modal>
  );
}

export default SaveContact;
