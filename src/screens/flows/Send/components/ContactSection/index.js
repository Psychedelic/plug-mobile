import { t } from 'i18next';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';

import CommonItem from '@/commonComponents/CommonItem';
import { Colors, FontStyles } from '@/constants/theme';

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
        <Text style={styles.title}>{t('send.contacts')}</Text>
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

const styles = StyleSheet.create({
  title: {
    ...FontStyles.Subtitle3,
    color: Colors.White.Secondary,
  },
});
