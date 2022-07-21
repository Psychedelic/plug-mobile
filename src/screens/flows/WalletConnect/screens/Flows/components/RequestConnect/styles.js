import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  buttonStyle: {
    minWidth: '48%',
  },
  buttonContainer: {
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
    color: Colors.ActionBlue,
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
    paddingBottom: 30,
  },
  cannisterItem: {
    marginVertical: 8,
  },
  subtitle: {
    paddingBottom: 10,
  },
  gradient: {
    top: -30,
    height: 30,
    width: '100%',
    position: 'absolute',
  },
  logo: {
    height: 30,
    resizeMode: 'contain',
  },
});
