import { StyleSheet } from 'react-native';

import { SEMIBOLD } from '@/constants/fonts';
import { Colors } from '@/constants/theme';
import { fontMaker } from '@/utils/fonts';

const commonBorderRadius = 16;
export const defaultPlaceholderTextColor = Colors.White.Secondary;

const styles = StyleSheet.create({
  inputStyle: {
    ...fontMaker({ size: 18, color: Colors.White.Pure, weight: SEMIBOLD }),
    paddingVertical: 13,
    borderRadius: commonBorderRadius,
    width: '100%',
    height: 56,
  },
  multiStyle: {
    alignItems: 'flex-start',
    height: 90,
  },
  viewStyle: {
    backgroundColor: Colors.Black.Primary,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: commonBorderRadius,
    height: 56,
    flexGrow: 0,
    paddingHorizontal: 16,
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

export default styles;
