import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

const commonPadding = 20;

export default StyleSheet.create({
  container: {
    paddingHorizontal: commonPadding,
    paddingTop: commonPadding,
    paddingBottom: commonPadding * 2,
  },
  button: {
    marginTop: commonPadding,
  },
  valid: {
    color: Colors.ActionBlue,
  },
  errorMessage: {
    marginTop: 5,
    marginLeft: 5,
    color: Colors.Red,
  },
});
