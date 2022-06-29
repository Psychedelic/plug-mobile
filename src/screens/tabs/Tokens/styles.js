import { StyleSheet } from 'react-native';

import { Colors, FontStyles } from '@/constants/theme';

const commonPadding = 20;

export default StyleSheet.create({
  title: {
    paddingLeft: commonPadding,
    paddingBottom: commonPadding,
    ...FontStyles.Title,
    color: Colors.White.Primary,
  },
  tokenItem: {
    marginTop: commonPadding,
    paddingHorizontal: commonPadding,
  },
  rowStyle: {
    justifyContent: 'space-between',
    paddingRight: commonPadding,
  },
});
