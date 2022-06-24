import { t } from 'i18next';
import React from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';

import CommonItem from '@/commonComponents/CommonItem';
import { FontStyles } from '@/constants/theme';

import styles from '../../styles';

const ContactSection = ({ onPress, filterText }) => {
  const { principal } = useSelector(state => state.keyring?.currentWallet);
  const contacts = useSelector(state => state.user?.contacts);
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
        <Text style={FontStyles.Subtitle3}>{t('send.contacts')}</Text>
        {filteredContacts.map(contact => (
          <CommonItem
            name={contact.name}
            id={contact.id}
            image={contact.image}
            key={contact.id}
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
