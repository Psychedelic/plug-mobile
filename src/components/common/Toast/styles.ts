import { StyleSheet } from 'react-native';

import { SEMIBOLD } from '@/constants/fonts';
import { Colors } from '@/constants/theme';
import { fontMaker } from '@/utils/fonts';
export default StyleSheet.create({
  container: {
    width: '92%',
    padding: 16,
    borderRadius: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  message: {
    color: Colors.White.Pure,
    opacity: 0.8,
  },
  title: {
    marginLeft: 10,
    ...fontMaker({ size: 14, color: Colors.White.Pure, weight: SEMIBOLD }),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
