import { StyleSheet } from 'react-native';

import { Colors, FontStyles } from '@/constants/theme';

export default StyleSheet.create({
  section: {
    borderTopColor: Colors.Gray.Primary,
    borderTopWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  title: FontStyles.Subtitle1,
  content: {
    paddingTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
