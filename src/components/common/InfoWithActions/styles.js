import { StyleSheet } from 'react-native';

import { Colors } from '../../../constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.Black.Primary,
    borderRadius: 15,
  },
  gradient: {
    padding: 1,
    borderRadius: 15,
  },
  text: {
    color: Colors.White.Primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  action: {
    marginLeft: 10,
  },
});
