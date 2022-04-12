import React, { Fragment, useRef, useState } from 'react';
import { Text, View, ActionSheetIOS } from 'react-native';
import Clipboard from '@react-native-community/clipboard';

import ContactItem from '../../components/common/ContactItem';
import Touchable from '../../components/animations/Touchable';
import AddEditContact from './components/AddEditContact';
import Header from '../../components/common/Header';
import Column from '../../components/layout/Column';
import { FontStyles } from '../../constants/theme';
import useContacts from '../../hooks/useContacts';
import Row from '../../components/layout/Row';
import Modal from '../../components/modal';
import Icon from '../../components/icons';
import styles from './styles';

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
        options: ['Cancel', 'Edit Contact', 'Copy Address', 'Delete Contact'],
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
        <Header center={<Text style={FontStyles.Subtitle2}>Contacts</Text>} />
        <Column style={styles.container}>
          <Touchable onPress={onAddContact}>
            <Row align="center" style={{ marginBottom: 30, marginTop: 10 }}>
              <Icon name="plus" />
              <Text style={FontStyles.Normal}> Add contact</Text>
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
                      style={{ marginBottom: 20 }}
                      key={`${contact.id}_${contact.name}`}>
                      <ContactItem
                        contact={contact}
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
        onClose={() => modalRef.current?.open()}
      />
    </>
  );
};

export default Contacts;
