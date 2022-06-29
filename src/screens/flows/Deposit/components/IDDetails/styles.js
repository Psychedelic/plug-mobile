import { StyleSheet } from 'react-native';

import { Colors, FontStyles } from '@/constants/theme';

export default StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    marginBottom: 60,
  },
  title: {
    ...FontStyles.Subtitle3,
    color: Colors.White.Secondary,
  },
  text: {
    ...FontStyles.NormalGray,
    marginVertical: 20,
  },
  toastStyle: {
    top: '65%',
    right: '3%',
  },
  toastPointerStyle: {
    top: 20,
  },
});
