import { StyleSheet } from 'react-native';

import { MEDIUM } from '@/constants/fonts';
import { Colors, FontStyles } from '@/constants/theme';
import { fontMaker } from '@/utils/fonts';

const inputHeight = 63;
const commonBorderRadius = 15;

export default StyleSheet.create({
  textInput: {
    ...FontStyles.Normal,
    fontSize: 24,
    marginRight: 'auto',
    width: '85%',
  },
  container: {
    backgroundColor: Colors.Black.Primary,
    flexDirection: 'row',
    height: inputHeight,
    borderRadius: commonBorderRadius,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  symbol: {
    ...fontMaker({
      size: 16,
      weight: MEDIUM,
      color: Colors.White.Secondary,
    }),
    marginLeft: 12,
  },
  focusedGradient: {
    borderRadius: commonBorderRadius,
    height: inputHeight + 4,
    width: '101%',
    top: -2,
    left: -2,
    position: 'absolute',
  },
  buttonStyle: {
    width: 41,
    height: 24,
    borderRadius: 8,
  },
  buttonTextStyle: {
    fontSize: 14,
  },
});
