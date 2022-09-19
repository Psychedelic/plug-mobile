import { StyleSheet } from 'react-native';

import { SEMIBOLD } from '@/constants/fonts';
import { Colors } from '@/constants/theme';
import { fontMaker } from '@/utils/fonts';

export const incognitoColor = Colors.White.Pure;

export default StyleSheet.create({
  token: {
    width: 41,
    height: 41,
    borderRadius: 41,
    borderColor: Colors.Divider[1],
    borderWidth: 1,
  },
  text: fontMaker({ weight: SEMIBOLD, size: 10 }),
  incognitoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Black.Primary,
  },
});
