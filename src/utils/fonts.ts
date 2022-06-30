import { TextStyle } from 'react-native';

import { Inter, NORMAL_STYLE, REGULAR, weights } from '@/constants/fonts';
import { isAndroid } from '@/constants/platform';
import { FontMakerOptions } from '@/interfaces/general';

export const fontMaker = (options: FontMakerOptions): TextStyle => {
  const { weight, family = Inter, size = 16, color } = options;
  let splitFamily = '';
  let font = {};
  if (isAndroid) {
    splitFamily = family.split('-')[0];
    font = { fontFamily: `${splitFamily}-${weight}` };
  } else {
    const fontWeight = weights[weight!] || weights[REGULAR];
    font = { fontFamily: family, fontWeight, fontStyle: NORMAL_STYLE };
  }
  return { ...font, color, fontSize: size };
};
