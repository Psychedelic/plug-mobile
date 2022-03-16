import emoji from 'emoji-datasource';

export const Categories = {
  emotion: {
    symbol: '😀',
    name: 'Smileys & Emotion',
  },
  people: {
    symbol: '🧑',
    name: 'People & Body',
  },
  nature: {
    symbol: '🦄',
    name: 'Animals & Nature',
  },
  food: {
    symbol: '🍔',
    name: 'Food & Drink',
  },
  activities: {
    symbol: '⚾️',
    name: 'Activities',
  },
  places: {
    symbol: '✈️',
    name: 'Travel & Places',
  },
  objects: {
    symbol: '💡',
    name: 'Objects',
  },
  symbols: {
    symbol: '🔣',
    name: 'Symbols',
  },
  flags: {
    symbol: '🏳️',
    name: 'Flags',
  },
};

export const charFromUtf16 = utf16 =>
  String.fromCodePoint(...utf16.split('-').map(u => '0x' + u));

export const charFromEmojiObject = obj => charFromUtf16(obj.unified);

export const filteredEmojis = emoji.filter(e => !e.obsoleted_by);

export const emojiByCategory = category =>
  filteredEmojis.filter(e => e.category === category.name);

export const sortEmoji = list =>
  list.sort((a, b) => a.sort_order - b.sort_order);

export const categoryKeys = Object.keys(Categories);

export const splitToRows = list => {
  const result = [];
  while (list.length > 0) {
    result.push(list.splice(0, 8));
  }
  return result;
};
