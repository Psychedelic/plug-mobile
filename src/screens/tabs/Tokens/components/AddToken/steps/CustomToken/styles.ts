import { StyleSheet } from 'react-native';

import { SEMIBOLD } from '@/constants/fonts';
import { Colors } from '@/constants/theme';
import { fontMaker } from '@/utils/fonts';

export const iconColor = Colors.White.Secondary;

export default StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  title: {
    color: Colors.White.Primary,
  },
  standardButton: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 56,
    backgroundColor: Colors.Black.Primary,
  },
  standardButtonError: {
    borderColor: Colors.Red,
    borderWidth: 1,
  },
  standardTextPlaceholder: {
    ...fontMaker({ size: 18, color: Colors.White.Secondary, weight: SEMIBOLD }),
  },
  standardText: {
    ...fontMaker({ size: 18, color: Colors.White.Pure, weight: SEMIBOLD }),
  },
  standardIcon: {
    transform: [{ rotate: '90deg' }],
  },
  button: {
    marginVertical: 16,
  },
  captionContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  standardCaption: {
    marginLeft: 4,
    color: Colors.White.Secondary,
    flex: 1,
  },
  errorContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  errorText: {
    marginLeft: 4,
    color: Colors.Red,
    flex: 1,
  },
  errorLink: {
    textDecorationLine: 'underline',
  },
});
