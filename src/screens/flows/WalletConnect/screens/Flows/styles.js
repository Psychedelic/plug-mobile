import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 36,
  },
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
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonStyle: {
    minWidth: '48%',
  },
  gradient: {
    top: -30,
    height: 30,
    width: '100%',
    alignSelf: 'center',
    position: 'absolute',
  },
  bottomContainer: {
    width: '100%',
    paddingBottom: 20,
  },
});