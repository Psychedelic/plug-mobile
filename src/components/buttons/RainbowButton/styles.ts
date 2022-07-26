import { StyleSheet } from 'react-native';

import { FontStyles } from '@/constants/theme';

export const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    width: '100%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textRainbow: FontStyles.Button,
  buttonRainbow: {
    backgroundColor: 'transparent',
  },
});
