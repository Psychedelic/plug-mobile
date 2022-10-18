import { StyleSheet } from 'react-native';

import { FontStyles } from '@/constants/theme';

export default StyleSheet.create({
  text: {
    ...FontStyles.NormalGray,
    marginVertical: 20,
  },
  letter: {
    ...FontStyles.NormalGray,
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  addRow: {
    paddingHorizontal: 20,
    marginBottom: 30,
    marginTop: 10,
  },
  plusIcon: {
    marginRight: 8,
  },
  contactItem: {
    marginBottom: 20,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
