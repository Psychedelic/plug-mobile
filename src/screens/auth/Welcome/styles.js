import { StyleSheet } from 'react-native';

import { pixelRatioScale } from '@/constants/platform';
import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 30,
    width: '100%',
    flex: 1,
  },
  plugIcon: {
    height: pixelRatioScale(50),
    resizeMode: 'contain',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.White.Primary,
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 27,
  },
  componentMargin: {
    marginTop: 27,
  },
  buttonMargin: {
    marginTop: 22,
  },
  buttonStyling: {
    minWidth: '84%',
  },
  valid: {
    color: Colors.ActionBlue,
    marginTop: 23,
    marginLeft: 30,
  },
});
