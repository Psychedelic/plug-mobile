import { TextStyle } from 'react-native';

import { Inter, REGULAR, weights } from '@/constants/fonts';
import { isAndroid } from '@/constants/platform';
import { FontMakerOptions } from '@/interfaces/general';

export const fontMaker = (options: FontMakerOptions): TextStyle => {
  const {
    weight = REGULAR,
    family = Inter,
    size = 16,
    color,
    style = 'normal',
  } = options;
  let splitFamily = '';
  let font = {};
  if (isAndroid) {
    splitFamily = family.split('-')[0];
    font = { fontFamily: `${splitFamily}-${weight}` };
  } else {
    const fontWeight = weights[weight];
    font = { fontFamily: family, fontWeight };
  }
  return { ...font, color, fontSize: size, fontStyle: style };
};
