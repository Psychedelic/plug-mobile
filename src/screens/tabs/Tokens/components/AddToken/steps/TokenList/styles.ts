import { StyleSheet } from 'react-native';

import { SEMIBOLD } from '@/constants/fonts';
import { WINDOW_HEIGHT } from '@/constants/platform';
import { Colors } from '@/constants/theme';
import { fontMaker } from '@/utils/fonts';

const ITEM_HEIGHT = 40;

export default StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    position: 'relative',
    paddingBottom: 16,
  },
  item: {
    height: ITEM_HEIGHT,
    marginVertical: 12,
  },
  loader: {
    flex: 1,
    height: WINDOW_HEIGHT / 2,
  },
  listTitle: {
    ...fontMaker({ size: 16, weight: SEMIBOLD, color: Colors.White.Secondary }),
    marginTop: 24,
    marginBottom: 12,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  dabContainer: {
    marginTop: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dabText: {
    marginLeft: 8,
    color: '#7479E6',
  },
});
