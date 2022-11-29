import { StyleSheet } from 'react-native';

import { SEMIBOLD } from '@/constants/fonts';
import { Colors } from '@/constants/theme';
import { fontMaker } from '@/utils/fonts';

export const searchColor = Colors.White.Secondary;

const BAR_HEIGHT = 48;

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    height: BAR_HEIGHT,
    flex: 1,
  },
  inputContent: {
    borderColor: Colors.Divider[1],
    borderWidth: 1,
    backgroundColor: Colors.Black.Pure,
  },
  searchIcon: {
    marginRight: 4,
  },
  addButton: {
    backgroundColor: Colors.Black.Primary,
    height: BAR_HEIGHT,
    width: BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    marginLeft: 8,
  },
  inputStyle: fontMaker({
    size: 16,
    weight: SEMIBOLD,
    color: Colors.White.Pure,
  }),
});
