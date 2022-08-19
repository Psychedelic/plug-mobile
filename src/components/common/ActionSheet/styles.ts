import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

const ITEM_RADIUS = 14;
export const ICON_COLOR = Colors.White.Secondary;

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
  icon: {
    marginRight: 16,
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
    flexDirection: 'row',
    paddingHorizontal: 8,
    height: 60,
    alignItems: 'center',
  },
  itemBorder: {},
  itemText: {
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
