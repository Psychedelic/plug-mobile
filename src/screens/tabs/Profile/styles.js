import { StyleSheet } from 'react-native';

import { FontStyles, Metrics } from '@/constants/theme';

export default StyleSheet.create({
  title: {
    paddingVertical: Metrics.Padding,
    paddingHorizontal: Metrics.Padding,
    ...FontStyles.Title,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: Metrics.Padding,
    paddingBottom: Metrics.Padding,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  name: {
    ...FontStyles.Subtitle1,
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
});
