import { StyleSheet } from 'react-native';

import { Colors, FontStyles } from '@/constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  headerAction: {
    ...FontStyles.Normal,
    color: Colors.ActionBlue,
  },
  button: {
    alignItems: 'center',
  },
});
