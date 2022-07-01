import { StyleSheet } from 'react-native';

import { SEMIBOLD } from '@/constants/fonts';
import { Colors } from '@/constants/theme';
import { fontMaker } from '@/utils/fonts';

export default StyleSheet.create({
  text: {
    ...fontMaker({ size: 16, weight: SEMIBOLD, color: Colors.ActionBlue }),
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
