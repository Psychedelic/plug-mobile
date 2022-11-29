import { StyleSheet } from 'react-native';

import { SEMIBOLD } from '@/constants/fonts';
import { pixelRatioScale } from '@/constants/platform';
import { Colors } from '@/constants/theme';
import { fontMaker } from '@/utils/fonts';

const commonMargin = 20;

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: Colors.Black.Primary,
    padding: 30,
    width: '100%',
    flex: 1,
  },
  plugIcon: {
    height: pixelRatioScale(30),
  },
  title: {
    ...fontMaker({
      size: 26,
      weight: SEMIBOLD,
      color: Colors.White.Primary,
    }),
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  moreOptionsIcon: {
    marginLeft: 11,
  },
  biometricsButton: {
    backgroundColor: 'transparent',
    flexDirection: 'row-reverse',
  },
  biometricsIcon: {
    marginRight: 11,
  },
  moreOptionsText: {
    color: Colors.Gray.Pure,
  },
});
