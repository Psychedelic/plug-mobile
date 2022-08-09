import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';
import { fontMaker } from '@/utils/fonts';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    ...fontMaker({ color: Colors.ActionBlue }),
    marginLeft: 5,
  },
});
