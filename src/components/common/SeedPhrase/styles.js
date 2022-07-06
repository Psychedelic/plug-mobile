import { StyleSheet } from 'react-native';

import { SEMIBOLD } from '@/constants/fonts';
import { Colors, FontStyles } from '@/constants/theme';
import { fontMaker } from '@/utils/fonts';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.Black.Pure,
    width: '100%',
    borderRadius: 15,
    flexWrap: 'wrap',
    flexDirection: 'row',
    height: 237,
    paddingHorizontal: 40,
    paddingVertical: 25,
    alignContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
    borderColor: Colors.Gray.Secondary,
    borderWidth: 1,
  },
  item: {
    width: '50%',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reveal: {
    ...fontMaker({ size: 16, weight: SEMIBOLD, color: Colors.White.Primary }),
    marginTop: 6,
  },
});
