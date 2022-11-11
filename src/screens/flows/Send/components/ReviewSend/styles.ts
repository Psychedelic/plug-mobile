import { StyleSheet } from 'react-native';

import { MEDIUM, SEMIBOLD } from '@/constants/fonts';
import { Colors } from '@/constants/theme';
import { fontMaker } from '@/utils/fonts';

export default StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingBottom: 45,
  },
  row: {
    height: 55,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  to: {
    borderRadius: 8,
    backgroundColor: Colors.Gray.Tertiary,
    width: 41,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 25,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  toRow: {
    paddingRight: 9,
  },
  valid: {
    marginTop: 4,
    color: Colors.ActionBlue,
  },
  title: fontMaker({ size: 24, weight: SEMIBOLD, color: Colors.White.Primary }),
  subtitle: fontMaker({
    size: 16,
    weight: MEDIUM,
    color: Colors.White.Secondary,
  }),
  nft: {
    height: 45,
    width: 45,
    borderRadius: 10,
  },
});
