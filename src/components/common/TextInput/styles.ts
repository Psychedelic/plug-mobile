import { StyleSheet } from 'react-native';

import { SEMIBOLD } from '@/constants/fonts';
import { isIos } from '@/constants/platform';
import { Colors } from '@/constants/theme';
import { fontMaker } from '@/utils/fonts';

const commonBorderRadius = 16;
export const defaultPlaceholderTextColor = Colors.White.Secondary;
export const errorColor = Colors.Red;

export const getCustomGradient = (color: string) => ({
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 1,
    y: 1,
  },
  colors: [color, color],
});

const styles = StyleSheet.create({
  textInput: {
    ...fontMaker({ size: 18, color: Colors.White.Pure, weight: SEMIBOLD }),
    flexGrow: 1,
    flex: 1,
  },
  singleLine: {
    height: 56,
  },
  innerContainer: {
    backgroundColor: Colors.Black.Primary,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: commonBorderRadius,
    paddingHorizontal: 16,
    flexGrow: 1,
  },
  multilineContainer: {
    paddingTop: isIos ? 8 : undefined,
    alignItems: 'flex-start',
  },
  gradientContainer: {
    borderRadius: commonBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1,
  },
  disabledContainer: {
    opacity: 0.4,
  },
});

export default styles;
