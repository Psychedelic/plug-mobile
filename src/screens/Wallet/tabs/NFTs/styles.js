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
    flexDirection: 'row',
    width: WINDOW_WIDTH,
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    paddingVertical: 10,
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
  emptyState: {
    marginTop: 120,
  },
});
