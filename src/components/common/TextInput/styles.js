import { StyleSheet } from 'react-native';

import { SEMIBOLD } from '@/constants/fonts';
import { Colors } from '@/constants/theme';
import { fontMaker } from '@/utils/fonts';

const commonBorderRadius = 15;
const inputHeight = 60;

export default StyleSheet.create({
  inputStyle: {
    ...fontMaker({ size: 18, color: Colors.White.Pure, weight: SEMIBOLD }),
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 15,
    width: '100%',
    height: 56,
  },
  multiStyle: {
    alignItems: 'flex-start',
    height: 90,
  },
  innerLabelStyle: {
    ...fontMaker({ size: 18, color: Colors.White.Pure, weight: SEMIBOLD }),
    minWidth: 5,
    flex: 1,
  },
  labledInputStyle: {
    paddingLeft: 0,
    flex: 12,
  },
  viewStyle: {
    backgroundColor: Colors.Black.Primary,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 15,
    height: 56,
    flexGrow: 0,
  },
  viewInnerStyle: {
    backgroundColor: Colors.Black.Primary,
    borderRadius: 15,
    height: 56,
    flexGrow: 0,
  },
  labledViewStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingBottom: 5,
    paddingTop: 5,
  },
  keyboardBG: {
    color: Colors.Black.Primary,
    height: '100%',
  },
  focusedGradient: {
    borderRadius: commonBorderRadius,
    position: 'absolute',
    height: inputHeight,
    width: '101%',
    left: -2,
    top: -2,
  },
  multiLineGradient: {
    height: 94,
  },
});
