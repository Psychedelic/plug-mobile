import { StyleSheet } from 'react-native';

import { isIos, pixelRatioScale } from '@/constants/platform';
import { Colors } from '@/constants/theme';

const commonMargin = 20;

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.Black.primary,
    padding: 30,
    width: '100%',
    flex: 1,
  },
  plugIcon: {
    height: pixelRatioScale(30),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    color: Colors.White.Primary,
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: commonMargin,
  },
  componentMargin: {
    marginTop: commonMargin,
  },
  buttonMargin: {
    marginTop: commonMargin,
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
  headerBiometricsButton: {
    alignSelf: 'flex-end',
    borderRadius: 25,
    backgroundColor: Colors.Black.primary,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContentContainer: {
    width: '100%',
    flexShrink: 1,
  },
  bottomContentContainer: {
    backgroundColor: Colors.Black.primary,
  },
  topContentBigDevice: {
    maxHeight: isIos ? '10%' : '20%',
  },
  containerBigDevice: {
    justifyContent: 'flex-start',
  },
  containerSmallDevice: {
    paddingBottom: 0,
  },
  moreOptionsButtonSmallDevice: {
    marginTop: 0,
  },
});
