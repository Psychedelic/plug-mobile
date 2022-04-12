import { StyleSheet } from 'react-native';

import { Colors } from '@constants/theme';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  marginedContainer: {
    marginTop: 20,
  },
  savedContactText: {
    marginTop: 5,
    color: 'red',
  },
  emojiContainer: {
    alignSelf: 'center',
    paddingBottom: 20,
  },
  valid: {
    color: Colors.ActionBlue,
  },
});
