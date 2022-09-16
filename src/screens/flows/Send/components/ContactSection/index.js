import { t } from 'i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import CommonItem from '@/commonComponents/CommonItem';
import Text from '@/components/common/Text';
import { TOKENS } from '@/constants/assets';
import { validateAccountId } from '@/utils/ids';

import styles from '../../styles';

const ContactSection = ({ onPress, filterText, selectedTokenSymbol }) => {
  const { principal, icnsData } = useSelector(
    state => state.keyring?.currentWallet
  );
  const contacts = useSelector(state => state.user?.contacts).filter(
    contact =>
      contact.id !== principal && contact.id !== icnsData.reverseResolvedName
  );
  const showAccountIDs =
    selectedTokenSymbol === TOKENS.ICP.symbol ||
    selectedTokenSymbol === undefined;

  const usableContacts = showAccountIDs
    ? contacts
    : contacts.filter(contact => !validateAccountId(contact.id));

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
        <Text type="subtitle3">{t('send.contacts')}</Text>
        {filteredContacts.map(contact => (
          <CommonItem
            name={contact.name}
            id={contact.id}
            icon={contact.image}
            key={contact.id}
            style={styles.contactItem}
            onPress={() => onPress(contact)}
            showActions={false}
          />
        ))}
      </>
    )
  );
};

export default ContactSection;
