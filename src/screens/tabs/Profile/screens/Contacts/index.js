import Clipboard from '@react-native-community/clipboard';
import { t } from 'i18next';
import React, { Fragment, useRef, useState } from 'react';
import { Text, View } from 'react-native';

import CommonItem from '@/commonComponents/CommonItem';
import Header from '@/commonComponents/Header';
import Modal from '@/commonComponents/Modal';
import Touchable from '@/commonComponents/Touchable';
import ActionSheet from '@/components/common/ActionSheet';
import Icon from '@/components/icons';
import { FontStyles } from '@/constants/theme';
import useContacts from '@/hooks/useContacts';
import { Column } from '@/layout';
import { Row } from '@/layout';

import AddEditContact from './components/AddEditContact';
import styles from './styles';

const Contacts = ({ modalRef }) => {
  const addEditContactRef = useRef(null);
  const actionSheetRef = useRef(null);
  const [actionSheetData, setActionSheetData] = useState(undefined);

  const { groupedContacts, onDelete } = useContacts();

  const [selectedContact, setSelectedContact] = useState(null);

  const onAddContact = () => {
    setSelectedContact(null);
    modalRef.current?.close();
    addEditContactRef.current?.open();
  };

  const onEditContact = contact => {
    setSelectedContact(contact);
    modalRef.current?.close();
    addEditContactRef.current?.open();
  };

  const onLongPress = contact => {
    const newActionsData = {
      options: [
        {
          id: 1,
          label: t('contacts.moreOptions.edit'),
          onPress: () => onEditContact(contact),
        },
        {
          id: 2,
          label: t('contacts.moreOptions.copy'),
          onPress: () => Clipboard.setString(contact.id),
        },
        {
          id: 3,
          label: t('contacts.moreOptions.delete'),
          onPress: () => onDelete(contact),
        },
      ],
    };
    setActionSheetData(newActionsData);
    actionSheetRef?.current?.open();
  };

  return (
    <>
      <Modal modalRef={modalRef} adjustToContentHeight>
        <Header
          center={
            <Text style={FontStyles.Subtitle2}>{t('contacts.title')}</Text>
          }
        />
        <Column style={styles.container}>
          <Touchable onPress={onAddContact}>
            <Row align="center" style={styles.addRow}>
              <Icon name="plus" style={styles.plusIcon} />
              <Text style={FontStyles.Normal}>{t('contacts.addContact')}</Text>
            </Row>
          </Touchable>
          {groupedContacts
            .sort((a, b) => a.letter.localeCompare(b.letter))
            .map(item => (
              <Fragment key={item.letter}>
                <Text style={styles.letter}>{item.letter}</Text>
                {item.contacts
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map(contact => (
                    <View
                      style={styles.contactItem}
                      key={`${contact.id}_${contact.name}`}>
                      <CommonItem
                        name={contact.name}
                        id={contact.id}
                        image={contact.image}
                        onLongPress={() => onLongPress(contact)}
                      />
                    </View>
                  ))}
              </Fragment>
            ))}
        </Column>
      </Modal>
      <ActionSheet
        modalRef={actionSheetRef}
        options={actionSheetData?.options}
      />
      <AddEditContact
        modalRef={addEditContactRef}
        contact={selectedContact}
        contactsRef={modalRef}
        onClose={modalRef.current?.open}
      />
    </>
  );
};

export default Contacts;
