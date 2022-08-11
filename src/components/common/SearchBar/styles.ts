import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export const searchColor = Colors.White.Secondary;

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: Colors.Black.Pure,
    flexGrow: 1,
    // height: 48,
  },
  searchIcon: {
    marginRight: 4,
  },
  addButton: {
    backgroundColor: Colors.Black.Primary,
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    marginLeft: 8,
  },
});
