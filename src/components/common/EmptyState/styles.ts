import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: Colors.White.Primary,
    marginTop: 11,
    marginBottom: 8,
  },
  text: {
    color: Colors.White.Secondary,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  link: {
    color: Colors.ActionBlue,
  },
  emoji: {
    fontSize: 38,
  },
});
