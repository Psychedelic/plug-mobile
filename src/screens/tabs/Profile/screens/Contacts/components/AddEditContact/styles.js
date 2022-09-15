import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  marginedContainer: {
    marginTop: 20,
  },
  errorMessage: {
    marginTop: 5,
    marginLeft: 5,
    color: Colors.Red,
  },
  errorIcon: {
    alignSelf: 'center',
    marginTop: 5,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emojiContainer: {
    alignSelf: 'center',
    paddingBottom: 20,
  },
  valid: {
    color: Colors.ActionBlue,
  },
  title: {
    textTransform: 'capitalize',
  },
  capitalized: {
    textTransform: 'capitalize',
  },
});
