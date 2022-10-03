import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export const unknownLogoColor = Colors.White.Primary;

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
    width: 30,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  unknownLogo: {
    alignSelf: 'center',
  },
  dappName: {
    paddingTop: 12,
    paddingBottom: 6,
    color: Colors.ActionBlue,
  },
  subtitle: {
    paddingBottom: 24,
    color: Colors.White.Pure,
    textAlign: 'center',
  },
  container: {
    alignItems: 'center',
    paddingTop: 30,
  },
});
