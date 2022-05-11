import { StyleSheet } from 'react-native';

import { FontStyles } from '@/constants/theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    ...FontStyles.LinkButton,
    fontSize: 17,
    marginLeft: 5,
  },
});
