import emoji from 'emoji-datasource';

export const Categories = {
  emotion: {
    symbol: 'π',
    name: 'Smileys & Emotion',
  },
  people: {
    symbol: 'π§',
    name: 'People & Body',
  },
  nature: {
    symbol: 'π¦',
    name: 'Animals & Nature',
  },
  food: {
    symbol: 'π',
    name: 'Food & Drink',
  },
  activities: {
    symbol: 'βΎοΈ',
    name: 'Activities',
  },
  places: {
    symbol: 'βοΈ',
    name: 'Travel & Places',
  },
  objects: {
    symbol: 'π‘',
    name: 'Objects',
  },
  symbols: {
    symbol: 'π£',
    name: 'Symbols',
  },
  flags: {
    symbol: 'π³οΈ',
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
