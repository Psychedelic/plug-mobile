import { StyleSheet } from 'react-native';

import { WINDOW_WIDTH } from '../../../constants/platform';
import { Colors } from '../../../constants/theme';

const videoDetailSize = WINDOW_WIDTH - 40;
const viewSendSize = 54;

const itemSize = WINDOW_WIDTH / 2 - 40;

const commonStyle = {
  borderRadius: 20,
  alignSelf: 'center',
};

const commonDetailContainer = {
  height: videoDetailSize,
  width: videoDetailSize,
};

const commonSendContainer = {
  height: viewSendSize,
  width: viewSendSize,
};

const commonCotainer = {
  ...commonStyle,
  width: itemSize,
  height: itemSize,
};

const commonWebViewStyles = {
  backgroundColor: 'transparent',
  flex: 0,
};

export default StyleSheet.create({
  image: {
    ...commonStyle,
  },
  container: {
    ...commonCotainer,
  },
  containerDetail: {
    ...commonDetailContainer,
  },
  video: {
    ...commonCotainer,
  },
  videoDetail: {
    ...commonDetailContainer,
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  sendActivityIndicator: {
    ...commonSendContainer,
  },
  webView: {
    ...commonWebViewStyles,
    ...commonCotainer,
  },
  webViewSend: {
    ...commonWebViewStyles,
    height: '100%',
    width: '100%',
  },
  containerSend: {
    ...commonSendContainer,
  },
  videoSend: {
    ...commonStyle,
    ...commonSendContainer,
  },
  webViewLoader: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: Colors.Black.Pure,
    height: '100%',
    width: '100%',
  },
});
