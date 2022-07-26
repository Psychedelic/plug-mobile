import { StyleSheet } from 'react-native';

import { SEMIBOLD } from '@/constants/fonts';
import { fontMaker } from '@/utils/fonts';

export default StyleSheet.create({
  button: {
    alignItems: 'center',
    width: 75,
  },
  text: {
    ...fontMaker({ size: 16, weight: SEMIBOLD }),
    marginTop: 4,
  },
  disabled: {
    opacity: 0.3,
  },
});
