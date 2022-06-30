import { StyleSheet } from 'react-native';

import { FontStyles } from '@/constants/theme';

export default StyleSheet.create({
  token: {
    marginTop: 20,
  },
  title: FontStyles.Subtitle3,
  nftText: {
    marginTop: 25,
  },
  nft: {
    margin: 10,
  },
  nftsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
