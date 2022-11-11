import { StyleSheet, ViewStyle } from 'react-native';

import { WINDOW_WIDTH } from '@/constants/platform';
import { Colors } from '@/constants/theme';

const itemSize = WINDOW_WIDTH / 2 - 40;

const commonCotainer = {
  alignSelf: 'center',
  width: itemSize,
  height: itemSize,
} as ViewStyle;

export default StyleSheet.create({
  video: commonCotainer,
  webView: {
    ...commonCotainer,
    backgroundColor: 'transparent',
    flex: 0,
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
