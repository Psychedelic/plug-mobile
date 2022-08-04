import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  symbol: {
    maxWidth: 20,
    resizeMode: 'contain',
    marginRight: 5,
  },
  assetAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
  icon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginRight: 8,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.Black.Secondary,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 26,
    borderRadius: 14,
  },
});
