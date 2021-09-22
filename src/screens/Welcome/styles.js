import { StyleSheet } from 'react-native';

import { Colors } from '../../constants/theme';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#15161C',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
    padding: 24,
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.White.Primary,
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 28,
  },
  componentMargin: {
    marginTop: 24,
  },
});
