import React, { useEffect, useState } from 'react';
import Modal from '../../../components/modal';
import Header from '../../../components/common/Header';
import TextInput from '../../../components/common/TextInput';
import RainbowButton from '../../../components/buttons/RainbowButton';
import { View, Text } from 'react-native';
import useContacts from '../../../hooks/useContacts';
import { FontStyles } from '../../../constants/theme';

const AddEditContact = ({ modalRef, contact, onClose }) => {
  const { onCreate, onEdit } = useContacts();

  const [name, setName] = useState('');
  const [id, setId] = useState('');

  const getName = () => (contact ? 'Edit Contact' : 'Add Contact');

  const onPress = () => {
    contact
      ? onEdit({ id, name, image: '🔥' })
      : onCreate({ id, name, image: '🔥' });

    modalRef.current?.close();
  };

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setId(contact.id);
    }
  }, [contact]);

  const isButtonDisabled = () => !name || !id;

  const handleClose = () => {
    setName('');
    setId('');
    onClose();
  };

  return (
    <Modal modalRef={modalRef} adjustToContentHeight onClose={handleClose}>
      <Header center={<Text style={FontStyles.Subtitle2}>{getName()}</Text>} />

      <View
        style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 }}>
        <TextInput
          value={name}
          variant="text"
          onChangeText={setName}
          placeholder="Name"
          autoFocus
        />

        <TextInput
          value={id}
          variant="text"
          onChangeText={setId}
          placeholder="Principal or Canister ID"
          customStyle={{ marginVertical: 20 }}
        />

        <RainbowButton
          text={getName()}
          onPress={onPress}
          disabled={isButtonDisabled()}
        />
      </View>
    </Modal>
  );
};

export default AddEditContact;
