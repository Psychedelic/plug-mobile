import { StyleSheet } from 'react-native';

import { Colors, FontStyles } from '@/constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  headerAction: {
    ...FontStyles.Normal,
    color: Colors.ActionBlue,
  },
  inputStyle: {
    width: '100%',
    marginBottom: 24,
  },
});
