import { StyleSheet } from 'react-native';

import { FontStyles } from '@/constants/theme';

export default StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  title: {
    ...FontStyles.Subtitle2,
  },
  buttonStyle: {
    marginTop: 20,
  },
  copyStyle: {
    marginTop: 30,
    alignSelf: 'center',
  },
});
