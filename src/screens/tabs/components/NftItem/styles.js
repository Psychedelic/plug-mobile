import { StyleSheet } from 'react-native';

import { WINDOW_WIDTH } from '@/constants/platform';
import { FontStyles } from '@/constants/theme';

export const ITEM_SIZE = WINDOW_WIDTH / 2 - 40;

const commonContainerSize = {
  width: ITEM_SIZE,
  height: ITEM_SIZE,
};

export default StyleSheet.create({
  text: {
    ...FontStyles.SmallGray,
    marginTop: 10,
    maxWidth: ITEM_SIZE,
  },
  item: {
    margin: 10,
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
});
