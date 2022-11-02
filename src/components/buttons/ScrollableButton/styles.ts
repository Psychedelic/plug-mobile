import { StyleSheet } from 'react-native';

import { Colors, FontStyles } from '@/constants/theme';
import { fontMaker } from '@/utils/fonts';

export default StyleSheet.create({
  button: {
    minWidth: 48,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.ActionBlue,
    borderRadius: 100,
    paddingHorizontal: 16,
    shadowColor: Colors.White.Pure,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  disabled: {
    opacity: 0.2,
  },
  text: {
    ...fontMaker({ ...FontStyles.Body2, color: Colors.White.Pure }),
  },
  marginText: {
    marginLeft: 8,
  },
});
