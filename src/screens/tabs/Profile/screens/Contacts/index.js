import Clipboard from '@react-native-community/clipboard';
import i18next, { t } from 'i18next';
import React, { Fragment, useRef, useState } from 'react';
import { ActionSheetIOS, Text, View } from 'react-native';

import CommonItem from '@/commonComponents/CommonItem';
import Header from '@/commonComponents/Header';
import Modal from '@/commonComponents/Modal';
import Touchable from '@/commonComponents/Touchable';
import Icon from '@/components/icons';
import { FontStyles } from '@/constants/theme';
import useContacts from '@/hooks/useContacts';
import { Column } from '@/layout';
import { Row } from '@/layout';

import AddEditContact from './components/AddEditContact';
import styles from './styles';

const moreOptions = i18next.t('contacts.moreOptions', { returnObjects: true });

const Contacts = ({ modalRef }) => {
  const addEditContactRef = useRef(null);

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
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: moreOptions,
        cancelButtonIndex: 0,
        destructiveButtonIndex: 3,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 1:
            onEditContact(contact);
            break;
          case 2:
            Clipboard.setString(contact.id);
            break;
          case 3:
            onDelete(contact);
            break;
        }
      },
    );
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
