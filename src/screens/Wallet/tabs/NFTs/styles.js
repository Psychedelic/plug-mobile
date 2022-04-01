import { StyleSheet } from 'react-native';

import { WINDOW_WIDTH } from '../../../../constants/platform';
import { FontStyles } from '../../../../constants/theme';

const itemSize = WINDOW_WIDTH / 2 - 40;

const commonContainerSize = {
  width: itemSize,
  height: itemSize,
};

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
  },
  nftsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 20,
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  item: {
    margin: 10,
  },
  text: {
    ...FontStyles.SmallGray,
    marginTop: 10,
    maxWidth: itemSize,
  },
  title: {
    paddingLeft: 20,
    paddingBottom: 20,
    ...FontStyles.Title,
  },
  nftDisplayer: {
    ...commonContainerSize,
  },
  touchable: {
    ...commonContainerSize,
  },
  disabledContainer: {
    opacity: 0.5,
  },
});
