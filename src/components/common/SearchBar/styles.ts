import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export const searchColor = Colors.White.Secondary;

export default StyleSheet.create({
  input: {
    backgroundColor: Colors.Black.Pure,
  },
  icon: {
    marginRight: 4,
  },
  addButton: {
    backgroundColor: Colors.Black.Primary,
    width: '10%',
  },
});
