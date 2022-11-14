import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

const ITEM_HEIGHT = 95;

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  activityItem: {
    paddingHorizontal: 0,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.Divider[1],
    height: ITEM_HEIGHT,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowTitle: {
    color: Colors.Gray.Pure,
    marginBottom: 24,
  },
  rowValue: {
    color: Colors.White.Primary,
    marginBottom: 24,
  },
  link: {
    color: Colors.ActionBlue,
  },
});
