import { useState } from 'react';

const CONTACTS = [
  {
    id: '123123123123123',
    name: 'Chris',
    image: '🔥',
  },
  {
    id: '123123123123123',
    name: 'Rocky',
    image: '😁',
  },
];

const useContacts = () => {
  const [contacts, setContacts] = useState(CONTACTS);

  const onCreate = contact => setContacts([...contacts, contact]);
  const onDelete = contact =>
    setContacts(contacts.filter(c => c.id !== contact.id));

  return { contacts, onCreate, onDelete };
};

export default useContacts;
