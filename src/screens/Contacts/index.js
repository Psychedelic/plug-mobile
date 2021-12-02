import React, { Fragment, useRef, useState } from 'react';
import Column from '../../components/layout/Column';
import Modal from '../../components/modal';
import { Text, View, ActionSheetIOS } from 'react-native';
import { FontStyles } from '../../constants/theme';
import Row from '../../components/layout/Row';
import Header from '../../components/common/Header';
import ContactItem from '../../components/common/ContactItem';
import useContacts from '../../hooks/useContacts';
import styles from './styles';
import Touchable from '../../components/animations/Touchable';
import Icon from '../../components/icons';
import AddEditContact from './components/AddEditContact';

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
        options: ['Cancel', 'Edit Contact', 'Delete Contact'],
        cancelButtonIndex: 0,
        destructiveButtonIndex: 2,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 1:
            onEditContact(contact);
            break;
          case 2:
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
        onClose={() => modalRef.current?.open()}
      />
    </>
  );
};

export default Contacts;
