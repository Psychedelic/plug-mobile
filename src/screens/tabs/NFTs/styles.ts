import { StyleSheet } from 'react-native';

import { WINDOW_WIDTH } from '@/constants/platform';
import { Colors, FontStyles } from '@/constants/theme';

const itemSize = WINDOW_WIDTH / 2 - 40;

const commonContainerSize = {
  width: itemSize,
  height: itemSize,
};

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  nftsContainer: {
    paddingBottom: 60,
  },
  text: {
    ...FontStyles.SmallGray,
    marginTop: 10,
    maxWidth: itemSize,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: FontStyles.Title,
  totalItems: {
    color: Colors.White.Secondary,
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
  emptyState: {
    marginTop: 60,
  },
  itemContainer: {
    margin: 10,
  },
  icnsImage: {
    backgroundColor: Colors.White.Pure,
    padding: 20,
  },
});
