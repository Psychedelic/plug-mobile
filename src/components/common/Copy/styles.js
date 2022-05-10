import { StyleSheet } from 'react-native';

import { FontStyles } from '@/constants/theme';

export default StyleSheet.create({
  text: {
    ...FontStyles.LinkButton,
    fontWeight: '600',
    marginLeft: 9,
  },
  container: {
    flexDirection: 'row',
    position: 'relative',
  },
  toastStyle: {
    top: -35,
    left: '12%',
  },
  toastPointerStyle: {
    top: 20,
  },
});
