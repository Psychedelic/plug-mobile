import { StyleSheet } from 'react-native';

import { FontStyles } from '@/constants/theme';

export default StyleSheet.create({
  title: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    ...FontStyles.Title,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  name: {
    marginLeft: 12,
    maxWidth: '75%',
  },
  emptyState: {
    marginTop: 60,
  },
  buttonStyle: {
    width: 90,
  },
  buttonTextStyle: {
    fontSize: 16,
  },
  listContainer: {
    flex: 1,
    minHeight: 200,
  },
});
