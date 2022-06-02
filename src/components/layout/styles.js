import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

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
  container: {
    flexGrow: 1,
  },
  outerContainer: {
    backgroundColor: Colors.Black.Pure,
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  content: {
    flex: 1,
    marginTop: 22,
    backgroundColor: Colors.Black.Primary,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});
