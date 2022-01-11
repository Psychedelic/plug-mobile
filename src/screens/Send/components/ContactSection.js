import React from 'react';
import { Text } from 'react-native';

import ContactItem from '../../../components/common/ContactItem';
import { FontStyles } from '../../../constants/theme';
import useContacts from '../../../hooks/useContacts';
import styles from '../styles';

const ContactSection = ({ onPress }) => {
  const { contacts } = useContacts();
  return (
    contacts?.length > 0 && (
      <>
        <Text style={FontStyles.Subtitle3}>Contacts</Text>
        {contacts.map(contact => (
          <ContactItem
            onPress={() => onPress(contact)}
            contact={contact}
            style={styles.contactItem}
          />
        ))}
      </>
    )
  );
};

export default ContactSection;
