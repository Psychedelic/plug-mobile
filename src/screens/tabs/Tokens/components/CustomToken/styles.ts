import { StyleSheet } from 'react-native';

import { SEMIBOLD } from '@/constants/fonts';
import { Colors } from '@/constants/theme';
import { fontMaker } from '@/utils/fonts';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  title: {
    color: Colors.White.Primary,
  },
  standardInput: {
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 48,
    backgroundColor: Colors.Black.Primary,
  },
  standardTextPlaceholder: {
    ...fontMaker({ size: 18, color: Colors.White.Secondary, weight: SEMIBOLD }),
  },
  standardText: {
    ...fontMaker({ size: 18, color: Colors.White.Pure, weight: SEMIBOLD }),
  },
  standardIcon: {
    transform: [{ rotate: '90deg' }],
    height: 18,
    width: 12,
  },
  button: {
    marginBottom: 16,
  },
});
