import { StyleSheet } from 'react-native';

import { Colors, FontStyles } from '@/constants/theme';

export default StyleSheet.create({
  valid: {
    color: Colors.ActionBlue,
  },
  contactItem: {
    marginTop: 15,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  centerText: {
    ...FontStyles.Subtitle2,
    color: Colors.White.Primary,
  },
});
