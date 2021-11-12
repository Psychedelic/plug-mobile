import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addContact,
  removeContact,
  setContacts,
} from '../redux/slices/keyring';
// import useKeyring from './useKeyring';

// const CONTACTS = [
//   {
//     id: '123123123123123',
//     name: 'Chris',
//     image: '🔥',
//   },
//   {
//     id: '123123123',
//     name: 'Rocky',
//     image: '😁',
//   },
// ];

const getFirstLetterFrom = value => value.slice(0, 1).toUpperCase();

const useContacts = () => {
  const { contacts } = useSelector(state => state.keyring);
  const dispatch = useDispatch();
  console.log('contacts', contacts);

  const onCreate = contact => dispatch(addContact(contact));
  const onDelete = contact => dispatch(removeContact(contact));
  const onEdit = contact =>
    dispatch(
      setContacts(contacts.map(c => (c.id === contact.id ? contact : c))),
    );

  const groupedContacts = useMemo(
    () =>
      contacts.reduce((list, contact) => {
        const { name } = contact;
        const listItem = list.find(
          item => item.letter && item.letter === getFirstLetterFrom(name),
        );
        if (!listItem) {
          list.push({ letter: getFirstLetterFrom(name), contacts: [contact] });
        } else {
          listItem.contacts.push(contact);
        }

        return list;
      }, []),
    [contacts],
  );

  return { contacts, groupedContacts, onCreate, onEdit, onDelete };
};

export default useContacts;
