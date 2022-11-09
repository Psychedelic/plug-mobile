import { StyleSheet, ViewStyle } from 'react-native';

import { WINDOW_WIDTH } from '@/constants/platform';
import { Colors } from '@/constants/theme';

const itemSize = WINDOW_WIDTH / 2 - 40;

const commonStyle = {
  borderRadius: 20,
  alignSelf: 'center',
} as ViewStyle;

const commonCotainer = {
  ...commonStyle,
  width: itemSize,
  height: itemSize,
};

export default StyleSheet.create({
  image: commonStyle,
  video: commonCotainer,
  webView: {
    backgroundColor: 'transparent',
    flex: 0,
    ...commonCotainer,
  },
  webViewLoader: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: Colors.Black.Pure,
    height: '100%',
    width: '100%',
  },
});
