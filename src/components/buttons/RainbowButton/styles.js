import { StyleSheet } from 'react-native';

import { Colors } from '@constants/theme';

export const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    width: '100%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textRainbow: {
    color: Colors.White.Pure,
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonRainbow: {
    backgroundColor: 'transparent',
  },
});
