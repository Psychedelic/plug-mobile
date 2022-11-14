import Clipboard from '@react-native-clipboard/clipboard';
import { t } from 'i18next';
import React, { Fragment, useMemo, useRef, useState } from 'react';
import { Platform, RefreshControl, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';

import CommonItem from '@/commonComponents/CommonItem';
import Touchable from '@/commonComponents/Touchable';
import { EmptyState } from '@/components/common';
import ActionSheet, { Option } from '@/components/common/ActionSheet';
import Text from '@/components/common/Text';
import Icon from '@/components/icons';
import { Colors, FontStyles } from '@/constants/theme';
import CopyIcon from '@/icons/material/Copy.svg';
import DeleteIcon from '@/icons/material/Delete.svg';
import EditIcon from '@/icons/material/Edit.svg';
import { Contact } from '@/interfaces/redux';
import { Row } from '@/layout';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getContacts, removeContact } from '@/redux/slices/user';
import { validateICNSName } from '@/utils/ids';

import AddEditContact from './components/AddEditContact';
import styles from './styles';
import { getGroupedContacts } from './utils';

interface Options {
  options: Option[];
}

function Contacts() {
  const addEditContactRef = useRef<Modalize>(null);
  const actionSheetRef = useRef<Modalize>(null);
  const [actionSheetData, setActionSheetData] = useState<Options>();
  const { contactsLoading, contacts } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const showEmptyState = contacts.length === 0;

  const groupedContacts = useMemo(
    () =>
      getGroupedContacts(contacts).sort((a, b) =>
        a.letter.localeCompare(b.letter)
      ),
    [contacts]
  );

  const [selectedContact, setSelectedContact] = useState<Contact>();

  const onAddContact = () => {
    setSelectedContact(undefined);
    addEditContactRef.current?.open();
  };

  const onEditContact = (contact: Contact) => {
    setSelectedContact(contact);
    addEditContactRef.current?.open();
  };

  const onPress = (contact: Contact) => {
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
      {!showEmptyState && (
        <Touchable onPress={onAddContact} style={styles.addButton}>
          <Row align="center" style={styles.addRow}>
            <Icon name="plus" style={styles.plusIcon} />
            <Text style={FontStyles.Normal}>{t('contacts.addContact')}</Text>
          </Row>
        </Touchable>
      )}
      <ScrollView
        style={styles.listContainer}
        contentContainerStyle={showEmptyState && styles.emptyListContainer}
        refreshControl={
          <RefreshControl
            refreshing={contactsLoading}
            onRefresh={() => dispatch(getContacts())}
            tintColor={Colors.White.Primary}
          />
        }>
        {showEmptyState ? (
          <EmptyState
            emoji="😶"
            onButtonPress={onAddContact}
            buttonStyle={styles.emptyStateButton}
            title={t('contacts.emptyState.title')}
            buttonTitle={t('contacts.addContact')}
            text={t('contacts.emptyState.message')}
          />
        ) : (
          groupedContacts.map(section => (
            <Fragment key={section.letter}>
              <Text style={styles.letter}>{section.letter}</Text>
              {section.contacts.map(contact => {
                const isICNS = validateICNSName(contact.id);
                return (
                  <View
                    style={styles.contactItem}
                    key={`${contact.id}_${contact.name}`}>
                    <CommonItem
                      name={contact.name}
                      id={isICNS ? undefined : contact.id}
                      subtitle={isICNS ? contact.id : undefined}
                      icon={contact.image}
                      onPress={() => onPress(contact)}
                      onActionPress={() => onPress(contact)}
                      disabled={contactsLoading}
                    />
                  </View>
                );
              })}
            </Fragment>
          ))
        )}
      </ScrollView>
      <ActionSheet
        modalRef={actionSheetRef}
        options={actionSheetData?.options}
      />
      <AddEditContact modalRef={addEditContactRef} contact={selectedContact} />
    </>
  );
}

export default Contacts;
