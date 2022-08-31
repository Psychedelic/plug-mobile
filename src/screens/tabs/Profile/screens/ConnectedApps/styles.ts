import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';
import { fontMaker } from '@/utils/fonts';

export default StyleSheet.create({
  emptyState: {
    ...fontMaker({ size: 17, color: Colors.Gray.Pure }),
    alignSelf: 'center',
    paddingBottom: 20,
  },
  appItem: {
    marginBottom: 24,
  },
  modalStyle: {
    paddingHorizontal: 20,
  },
});
