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
    width: 150,
    height: '100%',
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    marginTop: 4,
    fontWeight: 'bold',
  },
  selected: {
    color: Colors.White.Primary,
  },
  default: {
    color: Colors.White.Secondary,
  },
  profileTab: {
    width: 150,
    paddingLeft: 20,
  },
});
