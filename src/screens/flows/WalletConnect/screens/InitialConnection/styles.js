import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    width: '100%',
    flex: 1,
  },
  dappIcon: {
    height: 45,
    resizeMode: 'contain',
  },
  validText: {
    color: Colors.ActionBlue,
    textDecorationLine: 'underline',
  },
  buttonStyle: {
    minWidth: '48%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 30,
  },
  subtitle: {
    textAlign: 'center',
    paddingHorizontal: 70,
    paddingTop: 20,
  },
  title: {
    color: 'white',
    fontSize: 30,
  },
  changeWalletContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  onlyValid: {
    color: Colors.ActionBlue,
  },
  imageContainer: {
    backgroundColor: Colors.Gray.Tertiary,
    width: 60,
    height: 60,
    justifyContent: 'center',
    borderRadius: 14,
    marginBottom: 10,
  },
  defaultIcon: {
    alignSelf: 'center',
  },
  bottomContainer: {
    padding: 20,
  },
});
