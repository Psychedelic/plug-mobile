import { StyleSheet } from 'react-native';

import { SEMIBOLD } from '@/constants/fonts';
import { WINDOW_HEIGHT } from '@/constants/platform';
import { Colors } from '@/constants/theme';
import { fontMaker } from '@/utils/fonts';

const ITEM_HEIGHT = 40;

export default StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  item: {
    height: ITEM_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  logo: {
    height: ITEM_HEIGHT,
    width: ITEM_HEIGHT,
    borderRadius: 100,
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.Divider[16],
  },
  loader: {
    flex: 1,
    height: WINDOW_HEIGHT / 2,
  },
  listTitle: {
    ...fontMaker({ size: 16, weight: SEMIBOLD, color: Colors.White.Secondary }),
  },
  searchBar: {
    marginBottom: 24,
  },
});
