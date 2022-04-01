import { StyleSheet } from 'react-native';

import { Colors } from '../../../constants/theme';

export default StyleSheet.create({
  animationContainer: {
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 25,
    backgroundColor: Colors.White.Secondary,
    position: 'absolute',
  },
  pointer: {
    height: 10,
    width: 10,
    backgroundColor: Colors.White.Secondary,
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
  },
  text: {
    color: Colors.White.Primary,
  },
});
