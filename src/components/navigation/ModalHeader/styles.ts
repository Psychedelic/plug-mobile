import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  container: {
    height: 60,
  },
  header: {
    height: 60,
  },
  handle: {
    top: 10,
    height: 5,
    width: 30,
    backgroundColor: Colors.Gray.Primary,
    borderRadius: 100,
    alignSelf: 'center',
  },
});
