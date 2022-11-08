import { StyleSheet } from 'react-native';

import { WINDOW_WIDTH } from '@/constants/platform';
import { Colors } from '@/constants/theme';

const LOGO_SIZE = WINDOW_WIDTH / 2 - 30;

// This is estimated if item has title and subtitle
const CONTAINER_HEIGHT = LOGO_SIZE + 50;
const CONTAINER_MARGIN = 10;

export const TOTAL_CONTAINER_HEIGHT = CONTAINER_HEIGHT + CONTAINER_MARGIN * 2;

export default StyleSheet.create({
  container: {
    margin: CONTAINER_MARGIN,
  },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    backgroundColor: Colors.Black.Pure,
    borderRadius: 22,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 8,
  },
  title: {
    color: Colors.White.Pure,
  },
  subtitle: {
    color: Colors.Gray.Pure,
  },
});
