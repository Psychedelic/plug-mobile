import { StyleSheet } from 'react-native';

import { Colors } from '../../../constants/theme';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  outerContainer: {
    backgroundColor: Colors.Black.Pure,
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  content: {
    flex: 1,
    marginTop: 22,
    backgroundColor: Colors.Black.Primary,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  notchContainer: {
    marginTop: 38,
  },
});
