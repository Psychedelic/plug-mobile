import { StyleSheet } from 'react-native';

import { Colors } from '@constants/theme';

export default StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 35,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 25,
  },
  input: {
    marginBottom: 25,
  },
  toolTip: {
    backgroundColor: '#FFEEDC',
    borderRadius: 32,
    position: 'absolute',
    width: 71,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    right: 55,
    bottom: 43,
  },
  toolTipText: {
    color: Colors.Black.Pure,
  },
  valid: {
    color: Colors.ActionBlue,
  },
});
