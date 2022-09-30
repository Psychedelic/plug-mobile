import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  questionMark: {
    height: 20,
    width: 20,
    marginRight: 4,
  },
  unknownContainer: {
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: Colors.Gray.Primary,
  },
  symbol: {
    maxWidth: 20,
    resizeMode: 'contain',
    marginRight: 5,
  },
  logo: {
    height: 20,
    width: 20,
    marginRight: 5,
    borderRadius: 100,
  },
  assetAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  icon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginRight: 8,
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
});
