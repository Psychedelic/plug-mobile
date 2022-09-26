import { StyleSheet } from 'react-native';

import { Colors, FontStyles } from '@/constants/theme';

const commonPadding = 20;

export default StyleSheet.create({
  title: {
    paddingLeft: commonPadding,
    paddingBottom: commonPadding,
    ...FontStyles.Title,
  },
  tokenItem: {
    marginTop: commonPadding,
    paddingHorizontal: commonPadding,
  },
  rowStyle: {
    justifyContent: 'space-between',
    paddingRight: commonPadding,
  },
  scrollContent: {
    paddingBottom: 70,
  },
  optionText: {
    color: Colors.White.Primary,
  },
});
