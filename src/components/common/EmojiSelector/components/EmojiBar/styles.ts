import { StyleSheet } from 'react-native';

const categoryEmojiSize = 38;

export default StyleSheet.create({
  emojiBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    height: 35,
  },
  categoryEmoji: {
    height: categoryEmojiSize,
    width: categoryEmojiSize,
    borderRadius: 100,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categorySymbolText: {
    fontSize: 16,
  },
});
