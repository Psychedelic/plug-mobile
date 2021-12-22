import { StyleSheet } from 'react-native';

const commonStyle = {
  borderRadius: 20,
  alignSelf: 'center',
};

export default StyleSheet.create({
  image: {
    ...commonStyle,
  },
  video: {
    ...commonStyle,
    height: 165,
    width: 165,
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
