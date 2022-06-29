import { StyleSheet } from 'react-native';

import { Colors, FontStyles } from '@/constants/theme';

export default StyleSheet.create({
  divider: {
    width: '42%',
    justifyContent: 'center',
    marginRight: 'auto',
  },
  text: {
    ...FontStyles.Subtitle3,
    color: Colors.White.Secondary,
    textTransform: 'uppercase',
  },
});
