import { StyleSheet } from 'react-native';

import { WINDOW_WIDTH } from '@/constants/platform';
import { Colors, FontStyles } from '@/constants/theme';

const itemSize = WINDOW_WIDTH / 2 - 40;

const commonContainerSize = {
  width: itemSize,
  height: itemSize,
};

export default StyleSheet.create({
  text: {
    ...FontStyles.SmallGray,
    marginTop: 10,
    maxWidth: itemSize,
  },
  item: {
    margin: 10,
  },
  title: {
    paddingLeft: 20,
    paddingBottom: 20,
    ...FontStyles.Title,
    color: Colors.White.Primary,
  },
  nftDisplayer: {
    ...commonContainerSize,
  },
  touchable: {
    ...commonContainerSize,
  },
});
