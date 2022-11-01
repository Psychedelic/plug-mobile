import { StyleSheet } from 'react-native';

import { Colors, FontStyles } from '@/constants/theme';
import { fontMaker } from '@/utils/fonts';

export default StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.ActionBlue,
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: Colors.Black.Pure,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  smallButton: {
    paddingHorizontal: 10,
  },
  disabled: {
    opacity: 0.2,
  },
  text: {
    ...fontMaker({ ...FontStyles.Body2, color: Colors.White.Pure }),
  },
});
