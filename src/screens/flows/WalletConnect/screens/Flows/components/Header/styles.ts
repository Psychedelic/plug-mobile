import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  backgroundLogo: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: Colors.Gray.Secondary,
  },
  logo: {
    height: 30,
    resizeMode: 'contain',
  },
  dappName: {
    paddingTop: 12,
    paddingBottom: 6,
    color: Colors.ActionBlue,
  },
  subtitle: {
    paddingBottom: 10,
    color: Colors.White.Pure,
    textAlign: 'center',
  },
});
