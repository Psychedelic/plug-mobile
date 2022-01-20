import { StyleSheet } from 'react-native';

import { Colors } from '../../../constants/theme';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationContainer: {
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 25,
    backgroundColor: Colors.White.Secondary,
    position: 'absolute',
    top: 48,
    left: -3,
  },
  pointer: {
    height: 10,
    width: 10,
    backgroundColor: Colors.White.Secondary,
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
    top: -4,
  },
  text: {
    color: Colors.White.Primary,
  },
});
