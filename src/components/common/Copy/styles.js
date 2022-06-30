import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  text: {
    color: Colors.ActionBlue,
    fontSize: 16,
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
