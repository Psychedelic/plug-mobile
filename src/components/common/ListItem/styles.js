import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  number: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.ActionBlue,
    paddingRight: 5,
    textAlign: 'right',
    width: 30,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.White.Primary,
    textAlign: 'left',
    width: 90,
  },
});
