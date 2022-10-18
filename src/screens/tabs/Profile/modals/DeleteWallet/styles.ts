import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  text: {
    color: Colors.White.Secondary,
    textAlign: 'center',
  },
  description: {
    marginVertical: 16,
  },
  button: {
    backgroundColor: Colors.Red,
  },
});
