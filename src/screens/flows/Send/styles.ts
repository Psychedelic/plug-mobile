import { StyleSheet } from 'react-native';

import { SEMIBOLD } from '@/constants/fonts';
import { Colors, FontStyles } from '@/constants/theme';
import { fontMaker } from '@/utils/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  contactItem: {
    marginTop: 15,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  centerText: FontStyles.Subtitle2,
  input: {
    marginVertical: 6,
  },
  inputContent: {
    backgroundColor: Colors.Black.Pure,
  },
  inputLeftLabel: {
    ...fontMaker({ size: 18, color: Colors.White.Pure, weight: SEMIBOLD }),
    width: 32,
  },
  inputText: {
    flex: 1,
  },
  inputTextValid: {
    color: Colors.ActionBlue,
  },
  addIcon: {
    marginLeft: 4,
  },
});
