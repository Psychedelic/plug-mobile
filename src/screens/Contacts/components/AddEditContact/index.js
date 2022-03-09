import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import emojis from 'emoji-datasource';

import { charFromEmojiObject } from '../../../../components/common/EmojiSelector';
import RainbowButton from '../../../../components/buttons/RainbowButton';
import TextInput from '../../../../components/common/TextInput';
import { validatePrincipalId } from '../../../../helpers/ids';
import Header from '../../../../components/common/Header';
import { FontStyles } from '../../../../constants/theme';
import useContacts from '../../../../hooks/useContacts';
import Modal from '../../../../components/modal';
import styles from './styles';

const AddEditContact = ({ modalRef, contact, onClose }) => {
  const { contacts } = useSelector(state => state.user);
  const { onCreate, onEdit } = useContacts();
  const isEditContact = !!contact;

  const [name, setName] = useState('');
  const [id, setId] = useState('');

  const title = `${isEditContact ? 'Edit' : 'Add'} Contact`;
  const validId = validatePrincipalId(id);
  const savedContact = isEditContact ? false : contacts.find(c => c.id === id);

  const handleSubmit = () => {
    const randomEmoji = charFromEmojiObject(
      emojis[Math.floor(Math.random() * emojis.length)],
    );
    isEditContact
      ? onEdit({ contact, newContact: { id, name } })
      : onCreate({
          id,
          name,
          image: randomEmoji,
        });

    modalRef.current?.close();
  };

  const clearState = () => {
    setName('');
    setId('');
  };

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setId(contact.id);
    } else {
      clearState();
    }
  }, [contact]);

  const isButtonDisabled = () => !name || !id || !validId || !!savedContact;

  const handleClose = () => {
    onClose();
    if (!contact) {
      clearState();
    }
  };

  return (
    <Modal modalRef={modalRef} adjustToContentHeight onClose={handleClose}>
      <Header center={<Text style={FontStyles.Subtitle2}>{title}</Text>} />
      <View style={styles.container}>
        <TextInput
          autoFocus
          value={name}
          variant="text"
          maxLenght={22}
          placeholder="Name"
          onChangeText={setName}
        />
        <TextInput
          value={id}
          variant="text"
          onChangeText={setId}
          placeholder="Principal ID"
          customStyle={styles.marginedContainer}
        />
        {savedContact && (
          <Text style={styles.savedContactText}>
            {`Contact already saved as ${savedContact?.name}!`}
          </Text>
        )}
        <RainbowButton
          text={title}
          onPress={handleSubmit}
          buttonStyle={styles.marginedContainer}
          disabled={isButtonDisabled()}
        />
      </View>
    </Modal>
  );
};

export default AddEditContact;
