import { StyleSheet, Dimensions } from 'react-native';

const imageSize = Dimensions.get('window').width - 40;

export default StyleSheet.create({
  content: {
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  video: {
    width: imageSize,
    height: imageSize,
  },
  nftDisplayerContainer: {
    width: imageSize,
    height: imageSize,
    alignSelf: 'center',
  },
});
