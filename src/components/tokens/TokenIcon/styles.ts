import { StyleSheet } from 'react-native';

import { SEMIBOLD } from '@/constants/fonts';
import { Colors } from '@/constants/theme';
import { fontMaker } from '@/utils/fonts';

export default StyleSheet.create({
  genericToken: {
    width: 41,
    height: 41,
    textAlign: 'center',
    borderRadius: 41,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.Divider[1],
    borderWidth: 1,
  },
  text: fontMaker({ weight: SEMIBOLD, size: 10 }),
  blackBackground: {
    backgroundColor: 'black',
  },
});
