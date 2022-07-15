import { StyleSheet } from 'react-native';

import { pixelRatioScale } from '@/constants/platform';
import { Colors } from '@/constants/theme';

const commonMargin = 20;

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: Colors.Black.primary,
    padding: 30,
    width: '100%',
    flex: 1,
  },
  input: {
    width: '100%',
  },
  plugIcon: {
    height: pixelRatioScale(30),
    resizeMode: 'contain',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.White.Primary,
    fontSize: 26,
    fontWeight: 'bold',
    paddingVertical: commonMargin,
  },
  componentMargin: {
    marginTop: commonMargin,
  },
  buttonMargin: {
    marginTop: commonMargin,
    minWidth: '100%',
  },
  errorText: {
    marginTop: 5,
    color: 'red',
  },
  moreOptionsButton: {
    backgroundColor: null,
    flexDirection: 'row',
    opacity: 0.5,
    alignSelf: 'center',
  },
  moreOptionsIcon: {
    marginLeft: 11,
  },
  biometricsButton: {
    backgroundColor: null,
    flexDirection: 'row-reverse',
  },
  biometricsIcon: {
    marginRight: 11,
  },
});
