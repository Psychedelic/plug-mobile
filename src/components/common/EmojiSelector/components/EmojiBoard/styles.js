import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  emojiBoard: {
    height: 250,
  },
  emojiBoardRow: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 6,
    justifyContent: 'space-between',
  },
  lastBoardRow: {
    justifyContent: null,
  },
});
