import { StyleSheet } from 'react-native';

import { pixelRatioScale, refRatioScale } from '../../constants/platform';
import { Colors } from '../../constants/theme';

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
    width: '84%',
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
    marginVertical: 27,
  },
  componentMargin: {
    marginTop: 27,
  },
  buttonMargin: {
    marginTop: 27,
    minWidth: '84%',
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
    position: 'absolute',
    bottom: -refRatioScale(100),
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
