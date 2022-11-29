import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  token: {
    marginTop: 20,
  },
  nftText: {
    marginTop: 25,
    marginBottom: 8,
  },
  nft: {
    margin: 10,
  },
  nftsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemTitle: {
    color: Colors.Gray.Pure,
  },
  itemContainer: {
    marginVertical: 8,
    width: '48%',
  },
});
