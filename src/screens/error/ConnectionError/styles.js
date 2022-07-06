import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Black.Primary,
  },
  image: {
    resizeMode: 'contain',
    width: 30,
    alignSelf: 'center',
  },
  errorState: {
    marginBottom: '30%',
  },
});
