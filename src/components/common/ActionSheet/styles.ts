import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

const ITEM_RADIUS = 14;

export default StyleSheet.create({
  modal: {
    backgroundColor: Colors.Black.Primary,
  },
  topContainer: {
    backgroundColor: Colors.Black.Primary,
    borderRadius: ITEM_RADIUS,
    margin: 8,
    marginBottom: 0,
  },
  titleContainer: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  title: {
    color: Colors.White.Secondary,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.White.Secondary,
  },
  item: {
    paddingHorizontal: 8,
    height: 60,
    justifyContent: 'center',
  },
  itemBorder: {},
  itemText: {
    fontSize: 16,
    color: Colors.White.Primary,
  },
  destructiveText: {
    color: Colors.Red,
  },
  cancelContainer: {
    marginHorizontal: 8,
    marginBottom: 8,
  },
  cancelText: {},
});
