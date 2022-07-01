import { StyleSheet } from 'react-native';

import { SEMIBOLD } from '@/constants/fonts';
import { Colors } from '@/constants/theme';
import { fontMaker } from '@/utils/fonts';

const commonBorderRadius = 15;
const inputHeight = 60;

export default StyleSheet.create({
  inputStyle: {
    ...fontMaker({ size: 18, color: Colors.White.Pure, weight: SEMIBOLD }),
    paddingTop: 13,
    paddingLeft: 20,
    paddingBottom: 13,
    paddingRight: 20,
    height: 56,
    width: '100%',
    borderRadius: 15,
  },
  multiStyle: {
    height: 90,
    alignItems: 'flex-start',
  },
  innerLabelStyle: {
    ...fontMaker({ size: 18, color: Colors.White.Pure, weight: SEMIBOLD }),
    flex: 1,
    minWidth: 5,
  },
  labledInputStyle: {
    flex: 12,
    paddingLeft: 0,
  },
  viewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    flexGrow: 0,
    borderRadius: 15,
    backgroundColor: Colors.Black.Primary,
  },
  viewInnerStyle: {
    height: 56,
    flexGrow: 0,
    borderRadius: 15,
    backgroundColor: Colors.Black.Primary,
  },
  labledViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    paddingTop: 5,
    paddingBottom: 5,
  },
  keyboardBG: {
    height: '100%',
    color: Colors.Black.Primary,
  },
  focusedGradient: {
    borderRadius: commonBorderRadius,
    height: inputHeight,
    width: '101%',
    top: -2,
    left: -2,
    position: 'absolute',
  },
  multiLineGradient: {
    height: 94,
  },
});
