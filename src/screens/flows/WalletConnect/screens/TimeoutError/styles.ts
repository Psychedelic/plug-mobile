import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 33,
  },
  validText: {
    color: Colors.ActionBlue,
    textDecorationLine: 'underline',
  },
  title: {
    color: Colors.White.Pure,
  },
  icon: {
    fontSize: 40,
    marginBottom: 24,
  },
  subtitle: {
    marginTop: 8,
    paddingHorizontal: 70,
    textAlign: 'center',
  },
  buttonStyle: {
    minWidth: '100%',
    marginTop: 40,
  },
});
