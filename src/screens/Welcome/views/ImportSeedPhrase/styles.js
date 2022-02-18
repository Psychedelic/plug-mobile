import { StyleSheet } from 'react-native';

import { FontStyles } from '../../../../constants/theme';

export default StyleSheet.create({
  title: {
    ...FontStyles.Title,
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    ...FontStyles.NormalGray,
    marginTop: 5,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
});
