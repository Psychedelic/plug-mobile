import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export const searchColor = Colors.White.Secondary;

export default StyleSheet.create({
  container: {
    // flexDirection: 'row',
  },
  input: {
    backgroundColor: Colors.Black.Pure,
    // borderColor: Colors.Gray.Primary,
    // borderWidth: 1,
    // width: '90%',
  },
  icon: {
    marginRight: 4,
  },
  addButton: {
    backgroundColor: Colors.Black.Primary,
    width: '10%',
  },
});
