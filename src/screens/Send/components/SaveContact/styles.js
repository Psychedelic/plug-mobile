import { StyleSheet } from 'react-native';

import { Colors } from '../../../../constants/theme';

const commonPadding = 20;

export default StyleSheet.create({
  container: {
    paddingHorizontal: commonPadding,
    paddingTop: commonPadding,
    paddingBottom: commonPadding * 2,
  },
  input: {
    marginBottom: commonPadding,
  },
  valid: {
    color: Colors.ActionBlue,
  },
});
