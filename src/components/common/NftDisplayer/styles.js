import { StyleSheet, Dimensions } from 'react-native';

const videoDetailSize = Dimensions.get('window').width - 40;

const { width } = Dimensions.get('window');
const itemSize = width / 2 - 40;

const commonStyle = {
  borderRadius: 20,
  alignSelf: 'center',
};

const commonDetailContainer = {
  height: videoDetailSize,
  width: videoDetailSize,
};

const commonCotainer = {
  ...commonStyle,
  width: itemSize,
  height: itemSize,
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
  webView: {
    ...commonStyle,
    flex: 1,
  },
});
