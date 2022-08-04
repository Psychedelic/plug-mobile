import { StyleSheet } from 'react-native';

import { SEMIBOLD } from '@/constants/fonts';
import { Colors } from '@/constants/theme';
import { fontMaker } from '@/utils/fonts';

const commonBorderRadius = 16;

const styles = StyleSheet.create({
  inputStyle: {
    ...fontMaker({ size: 18, color: Colors.White.Pure, weight: SEMIBOLD }),
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: commonBorderRadius,
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
    borderRadius: commonBorderRadius,
    height: 56,
    flexGrow: 0,
  },
  viewInnerStyle: {
    backgroundColor: Colors.Black.Primary,
    borderRadius: commonBorderRadius,
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
    height: 60,
    width: '101%',
    left: -2,
    top: -2,
  },
  multiLineGradient: {
    height: 94,
  },
});

export const variants = {
  text: {
    viewStyle: styles.viewStyle,
    inputStyle: styles.inputStyle,
    innerLabelStyle: undefined,
    placeholderTextColor: Colors.White.Secondary,
    secureTextEntry: false,
  },
  multi: {
    viewStyle: { ...styles.viewStyle, ...styles.multiStyle },
    inputStyle: { ...styles.inputStyle, ...styles.multiStyle },
    innerLabelStyle: undefined,
    placeholderTextColor: Colors.White.Secondary,
    secureTextEntry: false,
  },
  password: {
    viewStyle: styles.viewStyle,
    inputStyle: styles.inputStyle,
    innerLabelStyle: undefined,
    placeholderTextColor: Colors.White.Secondary,
    secureTextEntry: true,
  },
  innerLabel: {
    viewStyle: { ...styles.labledViewStyle },
    inputStyle: { ...styles.inputStyle, ...styles.labledInputStyle },
    innerLabelStyle: styles.innerLabelStyle,
    placeholderTextColor: Colors.White.Secondary,
    secureTextEntry: false,
  },
};

export default styles;
