import { StyleSheet, Dimensions } from 'react-native';

import { FontStyles } from '../../../../constants/theme';

const { width } = Dimensions.get('window');
const itemSize = width / 2 - 40;

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: width,
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
  },
  title: {
    paddingLeft: 20,
    paddingBottom: 20,
    ...FontStyles.Title,
  },
  nftDisplayer: {
    width: itemSize,
    height: itemSize,
  },
});
