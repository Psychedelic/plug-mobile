import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

const commonMargin = 20;
export const iconColor = Colors.White.Secondary;

export default StyleSheet.create({
  firstInputContainer: {
    marginBottom: commonMargin,
    marginTop: commonMargin,
  },
  captionContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  captionText: {
    marginLeft: 4,
    color: Colors.White.Secondary,
    flex: 1,
  },
  button: {
    marginTop: commonMargin,
  },
});
