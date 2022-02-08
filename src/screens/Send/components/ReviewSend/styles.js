import { StyleSheet } from 'react-native';

import { Colors } from '../../../../constants/theme';

export default StyleSheet.create({
  content: {
    paddingHorizontal: 20,
  },
  row: {
    height: 55,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  to: {
    borderRadius: 8,
    backgroundColor: Colors.Gray.Tertiary,
    width: 41,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 45,
    marginTop: 25,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  toRow: {
    paddingRight: 9,
  },
  valid: {
    marginTop: 4,
    color: Colors.ActionBlue,
  },
});
