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
  plugIcon: {
    height: 110,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  validText: {
    color: Colors.ActionBlue,
    textDecorationLine: 'underline',
  },
  rainbowButton: {
    minWidth: '100%',
    marginBottom: 18,
  },
  buttonsContainer: {
    padding: 20,
  },
  subtitle: {
    textAlign: 'center',
    paddingHorizontal: 80,
    paddingTop: 20,
  },
  title: {
    color: 'white',
    fontSize: 30,
  },
});
