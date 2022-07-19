import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  valid: {
    color: Colors.ActionBlue,
  },
  buttonStyle: {
    minWidth: '48%',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 30,
  },
  user: {
    marginLeft: 10,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeWalletContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scrollViewContainer: {
    paddingVertical: 10,
  },
  dappName: {
    paddingTop: 12,
    paddingBottom: 6,
  },
  backgroundLogo: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: Colors.Gray.Tertiary,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 36,
  },
  bottomContainer: {
    width: '100%',
    paddingBottom: 36,
    paddingTop: 20,
  },
  cannisterItem: {
    marginVertical: 8,
  },
  subtitle: {
    paddingBottom: 10,
  },
  gradient: {
    top: -20,
    height: 20,
    width: '100%',
    position: 'absolute',
  },
  logo: {
    height: 30,
    resizeMode: 'contain',
  },
});
