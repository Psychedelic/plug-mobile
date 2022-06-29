import { StyleSheet } from 'react-native';

import { Colors, FontStyles } from '@/constants/theme';

export default StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 35,
    justifyContent: 'space-between',
  },
  title: {
    ...FontStyles.Subtitle2,
    color: Colors.White.Primary,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 25,
  },
});
