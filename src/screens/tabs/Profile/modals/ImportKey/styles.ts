import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 8,
  },
  inputStyle: {
    width: '100%',
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
  },
  error: {
    color: Colors.Red,
  },
});
