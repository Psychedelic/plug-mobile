import { StyleSheet } from 'react-native';

import { Colors, FontStyles } from '@/constants/theme';

const commonPadding = 20;

export default StyleSheet.create({
  title: {
    ...FontStyles.Subtitle2,
  },
  option: {
    ...FontStyles.Normal,
  },
  container: {
    paddingTop: commonPadding / 2,
    paddingHorizontal: commonPadding,
    marginBottom: commonPadding * 2,
  },
  optionContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: commonPadding,
    paddingHorizontal: commonPadding,
  },
  buttonStyle: {
    marginTop: commonPadding,
  },
  valid: {
    color: Colors.ActionBlue,
  },
});
