import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';
import { fontMaker } from '@/utils/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...fontMaker({ color: Colors.White.Primary }),
    marginTop: 11,
    marginBottom: 8,
  },
  text: {
    ...fontMaker({ color: Colors.White.Secondary }),
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  link: {
    ...fontMaker({ color: Colors.ActionBlue }),
  },
  emoji: {
    fontSize: 38,
  },
});
