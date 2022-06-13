import Clipboard from '@react-native-community/clipboard';
import { t } from 'i18next';
import React, { Fragment, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import CommonItem from '@/commonComponents/CommonItem';
import Header from '@/commonComponents/Header';
import Modal from '@/commonComponents/Modal';
import Touchable from '@/commonComponents/Touchable';
import ActionSheet from '@/components/common/ActionSheet';
import Icon from '@/components/icons';
import { FontStyles } from '@/constants/theme';
import CopyIcon from '@/icons/svg/material/Copy.svg';
import DeleteIcon from '@/icons/svg/material/Delete.svg';
import EditIcon from '@/icons/svg/material/Edit.svg';
import { Column, Row } from '@/layout';
import { removeContact } from '@/redux/slices/user';

import AddEditContact from './components/AddEditContact';
import styles from './styles';
import { getGroupedContacts } from './utils';

function Contacts({ modalRef }) {
  const addEditContactRef = useRef(null);
  const actionSheetRef = useRef(null);
  const [actionSheetData, setActionSheetData] = useState(undefined);
  const { contacts, contactsLoading } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const groupedContacts = useMemo(
    () => (contacts ? getGroupedContacts(contacts) : []),
    [contacts]
  );

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
          icon: Platform.select({ android: EditIcon }),
        },
        {
          id: 2,
          label: t('contacts.moreOptions.copy'),
          onPress: () => Clipboard.setString(contact.id),
          icon: Platform.select({ android: CopyIcon }),
        },
        {
          id: 3,
          label: t('contacts.moreOptions.delete'),
          onPress: () => dispatch(removeContact({ contactName: contact.name })),
          icon: Platform.select({ android: DeleteIcon }),
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
          {contactsLoading && (
            <View style={styles.loading}>
              <ActivityIndicator
                style={StyleSheet.absoluteFill}
                color="white"
              />
            </View>
          )}
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
}

export default Contacts;
