import { t } from 'i18next';
import React, { useMemo } from 'react';

import { CommonItem, Text } from '@/components/common';
import { Contact } from '@/interfaces/redux';
import { useAppSelector } from '@/redux/hooks';
import { validateAccountId, validateICNSName } from '@/utils/ids';

import styles from '../../styles';

interface Props {
  onPress: (contact: Contact) => void;
  filterText?: string;
  showAccountIdContacts?: boolean;
}

function ContactSection({ onPress, filterText, showAccountIdContacts }: Props) {
  const { principal, accountId, icnsData } = useAppSelector(
    state => state.keyring.currentWallet!
  );
  const contacts = useAppSelector(state => state.user?.contacts).filter(
    contact =>
      contact.id !== principal && contact.id !== icnsData?.reverseResolvedName
  );

  // This removes own account and all accounts with accountID contacts if showAccountIdContacts = false
  const usableContacts = useMemo(
    () =>
      contacts
        .filter(
          contact =>
            contact.id !== principal &&
            contact.id !== accountId &&
            contact.id !== icnsData?.reverseResolvedName &&
            (showAccountIdContacts || !validateAccountId(contact.id))
        )
        .sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        ),
    [contacts, showAccountIdContacts, principal, accountId, icnsData]
  );

  const filteredContacts = filterText
    ? usableContacts.filter(
        contact =>
          contact.name.toLowerCase().includes(filterText.toLowerCase()) ||
          contact.id.includes(filterText.toLowerCase())
      )
    : usableContacts;

  // what if users dont have contacts? show something.
  return usableContacts?.length > 0 ? (
    <>
      <Text type="subtitle3">{t('send.contacts')}</Text>
      {filteredContacts.map(contact => {
        const isICNS = validateICNSName(contact.id);
        return (
          <CommonItem
            name={contact.name}
            id={isICNS ? undefined : contact.id}
            subtitle={isICNS ? contact.id : undefined}
            icon={contact.image}
            key={contact.id}
            style={styles.contactItem}
            onPress={() => onPress(contact)}
            showActions={false}
          />
        );
      })}
    </>
  ) : null;
}

export default ContactSection;
