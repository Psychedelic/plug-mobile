import { StyleSheet } from 'react-native';

import { Colors } from '../../../constants/theme';

export default StyleSheet.create({
  root: {
    height: 94,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Black.Primary,
  },
  tab: {
    bottom: 0,
    width: 130,
    height: '100%',
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    marginTop: 4,
    fontWeight: 'bold',
  },
  selected: {
    color: Colors.White.Primary,
  },
  default: {
    color: Colors.White.Secondary,
  },
  disabledTab: {
    opacity: 0.5,
  },
});
