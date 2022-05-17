import { StyleSheet } from 'react-native';

import { FontStyles } from '@/constants/theme';

export default StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  title: {
    ...FontStyles.Subtitle3,
  },
  text: {
    ...FontStyles.NormalGray,
    marginVertical: 20,
  },
  letter: {
    ...FontStyles.NormalGray,
    marginBottom: 20,
  },
  addRow: {
    marginBottom: 30,
    marginTop: 10,
  },
  plusIcon: {
    marginRight: 8,
  },
  contactItem: {
    marginBottom: 20,
  },
});
