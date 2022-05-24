import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

const ITEM_RADIUS = 14;

export default StyleSheet.create({
  modal: {
    backgroundColor: 'transparent',
  },
  titleContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.Gray.Primary,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  title: {
    color: Colors.Gray.Pure,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: Colors.Gray.Pure,
    textAlign: 'center',
  },
  topContainer: {
    backgroundColor: Colors.Black.Primary,
    borderRadius: ITEM_RADIUS,
    margin: 8,
  },
  item: {
    height: 60,
    justifyContent: 'center',
  },
  itemBorder: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.Gray.Primary,
  },
  itemText: {
    fontSize: 18,
    textAlign: 'center',
    color: Colors.ActionBlue,
  },
  destructiveText: {
    color: Colors.Red,
  },
  cancelContainer: {
    backgroundColor: Colors.Gray.Secondary,
    borderRadius: ITEM_RADIUS,
    marginHorizontal: 8,
    marginBottom: 8,
  },
  cancelText: {
    fontWeight: 'bold',
  },
});
