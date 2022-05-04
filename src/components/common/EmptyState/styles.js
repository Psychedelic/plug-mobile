import { StyleSheet } from 'react-native';

import { FontStyles } from '@constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...FontStyles.Title,
    marginTop: 15,
    marginBottom: 11,
  },
  text: {
    ...FontStyles.NormalGray,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  emoji: {
    fontSize: 40,
  },
});
