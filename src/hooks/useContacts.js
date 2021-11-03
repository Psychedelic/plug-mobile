import { useState, useEffect } from 'react';

const CONTACTS = [
  {
    id: '123123123123123',
    name: 'Chris',
    image: '🔥',
  },
  {
    id: '123123123',
    name: 'Rocky',
    image: '😁',
  },
];

const getFirstLetterFrom = value => value.slice(0, 1).toUpperCase();

const useContacts = () => {
  const [contacts, setContacts] = useState(CONTACTS);
  const [groupedContacts, setGroupedContacts] = useState([]);

  const onCreate = contact => {
    setContacts([...contacts, contact]);
  };
  const onEdit = contact =>
    setContacts(contacts.map(c => (c.id === contact.id ? contact : c)));
  const onDelete = contact =>
    setContacts(contacts.filter(c => c.id !== contact.id));

  useEffect(() => {
    setGroupedContacts(
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
    );
  }, [contacts]);

  return { contacts, groupedContacts, onCreate, onEdit, onDelete };
};

export default useContacts;
