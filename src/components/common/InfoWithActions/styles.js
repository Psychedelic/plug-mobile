import { StyleSheet } from 'react-native';

import { SEMIBOLD } from '@/constants/fonts';
import { Colors } from '@/constants/theme';
import { fontMaker } from '@/utils/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.Black.Primary,
    borderRadius: 15,
  },
  gradient: {
    padding: 1,
    borderRadius: 15,
  },
  text: fontMaker({
    color: Colors.White.Primary,
    size: 16,
    weight: SEMIBOLD,
  }),
  action: {
    marginLeft: 10,
  },
});
