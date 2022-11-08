import emoji from 'emoji-datasource';

export interface Category {
  name: string;
  symbol: string;
  type: string;
}

export const Categories: Category[] = [
  {
    symbol: '😀',
    name: 'Smileys & Emotion',
    type: 'emotion',
  },
  {
    symbol: '🧑',
    name: 'People & Body',
    type: 'people',
  },
  {
    symbol: '🦄',
    name: 'Animals & Nature',
    type: 'nature',
  },
  {
    symbol: '🍔',
    name: 'Food & Drink',
    type: 'food',
  },
  {
    symbol: '⚾️',
    name: 'Activities',
    type: 'activities',
  },
  {
    symbol: '✈️',
    name: 'Travel & Places',
    type: 'places',
  },
  {
    symbol: '💡',
    name: 'Objects',
    type: 'objects',
  },
  {
    symbol: '🔣',
    name: 'Symbols',
    type: 'symbols',
  },
  {
    symbol: '🏳️',
    name: 'Flags',
    type: 'flags',
  },
];

export const charFromUtf16 = utf16 =>
  String.fromCodePoint(...utf16.split('-').map(u => '0x' + u));

export const charFromEmojiObject = obj => charFromUtf16(obj.unified);

export const filteredEmojis = emoji.filter(e => !e.obsoleted_by);

export const emojiByCategory = (category: Category) =>
  filteredEmojis.filter(e => e.category === category.name);

export const sortEmoji = list =>
  list.sort((a, b) => a.sort_order - b.sort_order);

export const splitToRows = list => {
  const result = [];
  while (list.length > 0) {
    result.push(list.splice(0, 8));
  }
  return result;
};
