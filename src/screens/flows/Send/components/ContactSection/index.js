import React from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';

import CommonItem from '@/commonComponents/CommonItem';
import { FontStyles } from '@/constants/theme';
import useContacts from '@/hooks/useContacts';

import styles from '../../styles';

const ContactSection = ({ onPress, filterText }) => {
  const { contacts } = useContacts();
  const { principal } = useSelector(state => state.keyring?.currentWallet);
  const usableContacts = contacts.filter(contact => contact.id !== principal);

  const filteredContacts = filterText
    ? usableContacts.filter(
        contact =>
          contact.name.toLowerCase().includes(filterText.toLowerCase()) ||
          contact.id.includes(filterText.toLowerCase())
      )
    : usableContacts;

  return (
    usableContacts?.length > 0 && (
      <>
        <Text style={FontStyles.Subtitle3}>Contacts</Text>
        {filteredContacts.map((contact, index) => (
          <CommonItem
            name={contact.name}
            id={contact.id}
            image={contact.image}
            key={index}
            onPress={() => onPress(contact)}
            style={styles.contactItem}
            showActions={false}
          />
        ))}
      </>
    )
  );
};

export default ContactSection;
