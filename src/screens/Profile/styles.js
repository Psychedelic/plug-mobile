import { StyleSheet } from 'react-native';

import { FontStyles, Metrics } from '../../constants/theme';

export default StyleSheet.create({
  title: {
    paddingVertical: Metrics.Padding,
    paddingHorizontal: Metrics.Padding,
    ...FontStyles.Title,
  },
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: Metrics.Padding,
    paddingBottom: Metrics.Padding,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    ...FontStyles.Subtitle,
    marginLeft: 12
  }
});
