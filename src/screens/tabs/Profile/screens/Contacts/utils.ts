import { getFirstLetterFrom } from '@/utils/strings';

export interface Contact {
  image: string;
  name: string;
  id: string;
}

interface ContactList {
  contacts: Contact[];
  letter: string;
}

export const getGroupedContacts = (contacts: Contact[]) => {
  return contacts.reduce((list: ContactList[], contact: Contact) => {
    const { name } = contact;
    const listItem = list.find(
      item => item.letter && item.letter === getFirstLetterFrom(name)
    );
    if (!listItem) {
      list.push({ letter: getFirstLetterFrom(name), contacts: [contact] });
    } else {
      listItem.contacts.push(contact);
    }

    return list;
  }, []);
};
