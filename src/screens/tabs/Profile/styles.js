import { StyleSheet } from 'react-native';

import { Colors, FontStyles, Metrics } from '@/constants/theme';

export default StyleSheet.create({
  title: {
    paddingVertical: Metrics.Padding,
    paddingHorizontal: Metrics.Padding,
    ...FontStyles.Title,
    color: Colors.White.Primary,
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
    ...FontStyles.Subtitle,
    color: Colors.White.Primary,
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
