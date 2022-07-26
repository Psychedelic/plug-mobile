import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1,
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  valid: {
    color: Colors.ActionBlue,
  },
  version: {
    alignSelf: 'flex-end',
  },
});
