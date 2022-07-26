import { StyleSheet } from 'react-native';

import { SEMIBOLD } from '@/constants/fonts';
import { fontMaker } from '@/utils/fonts';

export default StyleSheet.create({
  buttons: {
    height: 165,
    width: 260,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  container: {
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    width: 75,
  },
  text: {
    ...fontMaker({ size: 16, weight: SEMIBOLD }),
    marginTop: 4,
  },
});
