import React from 'react';
import useContacts from '../../../hooks/useContacts';
import ContactItem from '../../../components/common/ContactItem';
import { Text } from 'react-native';
import { FontStyles } from '../../../constants/theme';

const ContactSection = ({ onPress }) => {
  const { contacts } = useContacts();
  return (
    <>
      <Text style={FontStyles.Subtitle3}>Contacts</Text>
      {contacts.map(contact => (
        <ContactItem
          onPress={() => onPress(contact)}
          contact={contact}
          style={{ marginTop: 15 }}
        />
      ))}
    </>
  );
};

export default ContactSection;
