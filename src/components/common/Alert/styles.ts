import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.Black.Primary,
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    minHeight: 80,
  },
  textContainer: {
    flex: 1,
  },
  caption: {
    color: Colors.White.Pure,
  },
});
