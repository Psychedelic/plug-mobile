import { StyleSheet } from 'react-native';

import { WINDOW_WIDTH } from '@/constants/platform';

const imageSize = WINDOW_WIDTH - 40;

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
  collectionSection: {
    borderTopWidth: 0,
  },
  buttonWraperLeft: {
    flex: 1,
    marginRight: 10,
  },
  buttonWraperRight: {
    flex: 1,
    marginLeft: 10,
  },
});
