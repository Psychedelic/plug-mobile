import { StyleSheet } from 'react-native';

import { Colors, FontStyles } from '@/constants/theme';

export default StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  title: {
    ...FontStyles.Subtitle2,
    color: Colors.White.Primary,
  },
  buttonStyle: {
    marginTop: 20,
  },
});
