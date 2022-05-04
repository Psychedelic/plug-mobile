import { StyleSheet } from 'react-native';

import { Colors } from '@constants/theme';

export default StyleSheet.create({
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  separator: {
    height: 0,
    borderBottomColor: Colors.Gray.Secondary,
    borderBottomWidth: 1,
    width: '100%',
  },
});
