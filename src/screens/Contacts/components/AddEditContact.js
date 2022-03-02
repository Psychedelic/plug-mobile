import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import emojis from 'emoji-datasource';

import Modal from '../../../components/modal';
import useContacts from '../../../hooks/useContacts';
import { FontStyles } from '../../../constants/theme';
import Header from '../../../components/common/Header';
import TextInput from '../../../components/common/TextInput';
import RainbowButton from '../../../components/buttons/RainbowButton';
import { validatePrincipalId, validateAccountId } from '../../../helpers/ids';
import { charFromEmojiObject } from '../../../components/common/EmojiSelector';

const AddEditContact = ({ modalRef, contact, onClose }) => {
  const { onCreate, onEdit } = useContacts();

  const [name, setName] = useState('');
  const [id, setId] = useState('');

  const title = `${contact ? 'Edit' : 'Add'} Contact`;
  const validId = validatePrincipalId(id) || validateAccountId(id);

  const handleSubmit = () => {
    const randomEmoji = charFromEmojiObject(
      emojis[Math.floor(Math.random() * emojis.length)],
    );
    contact
      ? onEdit({ ...contact, id, name })
      : onCreate({
          id,
          name,
          image: randomEmoji,
        });

    modalRef.current?.close();
  };

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setId(contact.id);
    } else {
      setName('');
      setId('');
    }
  }, [contact]);

  const isButtonDisabled = () => !name || !id || !validId;

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal modalRef={modalRef} adjustToContentHeight onClose={handleClose}>
      <Header center={<Text style={FontStyles.Subtitle2}>{title}</Text>} />
      <View
        style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 }}>
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
          placeholder="Principal or Account ID"
          customStyle={{ marginVertical: 20 }}
        />
        <RainbowButton
          text={title}
          onPress={handleSubmit}
          disabled={isButtonDisabled()}
        />
      </View>
    </Modal>
  );
};

export default AddEditContact;
