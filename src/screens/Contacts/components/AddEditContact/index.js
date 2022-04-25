import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Keyboard } from 'react-native';
import { useSelector } from 'react-redux';
import emojis from 'emoji-datasource';

import { charFromEmojiObject } from '@commonComponents/EmojiSelector/utils';
import EmojiSelector from '@modals/EmojiSelector';
import RainbowButton from '@components/buttons/RainbowButton';
import TextInput from '@commonComponents/TextInput';
import { validatePrincipalId } from '@helpers/ids';
import UserIcon from '@commonComponents/UserIcon';
import Header from '@commonComponents/Header';
import { FontStyles } from '@constants/theme';
import useContacts from '@hooks/useContacts';
import Modal from '@components/modal';

import styles from './styles';

const AddEditContact = ({ modalRef, contact, onClose, contactsRef }) => {
  const { contacts } = useSelector(state => state.user);
  const { onCreate, onEdit } = useContacts();
  const editEmojiRef = useRef(null);

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('');
  const [error, setError] = useState(false);

  const isEditContact = !!contact;
  const title = `${isEditContact ? 'Edit' : 'Add'} Contact`;
  const validId = validatePrincipalId(id);
  const savedContact = contacts.find(c => c.id === id);
  const savedContactName = contacts.find(c => c.name === name);
  const nameError = savedContactName && contact?.name !== name;
  const idError = savedContact && contact?.id !== id;

  const handleSubmit = () => {
    if (idError || nameError) {
      setError(true);
    } else {
      setError(false);
      const randomEmoji = charFromEmojiObject(
        emojis[Math.floor(Math.random() * emojis.length)],
      );
      isEditContact
        ? onEdit({ contact, newContact: { id, name, image: emoji } })
        : onCreate({
            id,
            name,
            image: randomEmoji,
          });

      modalRef.current?.close();
    }
  };

  const clearState = () => {
    setName('');
    setId('');
    setEmoji('');
    setError(false);
  };

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setId(contact.id);
    } else {
      clearState();
    }
  }, [contact]);

  const isButtonDisabled = () => !name || !id || !validId;

  const handleClose = () => {
    onClose();
    setError(false);
    if (!contact) {
      clearState();
    }
  };

  const onEditEmoji = () => {
    Keyboard.dismiss();
    editEmojiRef?.current.open();
  };

  const closeModal = () => {
    setError(false);
    modalRef?.current.close();
    contactsRef?.current.close();
  };

  const handleBack = () => {
    setError(false);
    modalRef?.current.close();
  };

  const handleOnChangeName = text => {
    setError(false);
    setName(text);
  };

  const handleOnChangeId = text => {
    setError(false);
    setId(text);
  };

  return (
    <Modal modalRef={modalRef} adjustToContentHeight onClose={handleClose}>
      <Header
        right={
          <Text style={[FontStyles.Normal, styles.valid]} onPress={closeModal}>
            Close
          </Text>
        }
        left={
          <Text style={[FontStyles.Normal, styles.valid]} onPress={handleBack}>
            Back
          </Text>
        }
        center={<Text style={FontStyles.Subtitle2}>{title}</Text>}
      />
      <View style={styles.container}>
        {isEditContact && (
          <View style={styles.emojiContainer}>
            <UserIcon
              icon={emoji || contact?.image}
              size="extralarge"
              onPress={onEditEmoji}
            />
          </View>
        )}
        <TextInput
          autoFocus
          value={name}
          variant="text"
          maxLenght={22}
          placeholder="Name"
          onChangeText={handleOnChangeName}
        />
        <TextInput
          value={id}
          variant="text"
          onChangeText={handleOnChangeId}
          placeholder="Principal ID"
          customStyle={styles.marginedContainer}
        />
        {error && (
          <Text style={styles.savedContactText}>
            {nameError
              ? 'Name is already taken!'
              : `Contact already saved as ${savedContact?.name}!`}
          </Text>
        )}
        <RainbowButton
          text={title}
          onPress={handleSubmit}
          buttonStyle={styles.marginedContainer}
          disabled={isButtonDisabled()}
        />
      </View>
      <EmojiSelector
        modalRef={editEmojiRef}
        onSave={setEmoji}
        emoji={emoji || contact?.image}
      />
    </Modal>
  );
};

export default AddEditContact;
