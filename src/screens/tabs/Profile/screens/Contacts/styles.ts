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
  addButton: {
    marginTop: 8,
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
  emptyListContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  emptyStateButton: {
    minWidth: '100%',
    marginTop: 32,
  },
});
