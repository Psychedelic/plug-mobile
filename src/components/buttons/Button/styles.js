import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/theme';

export default StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.White.Pure,
  },
  button: {
    borderRadius: 15,
    width: '100%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Gray.Primary,
  },
  disabled: {
    opacity: 0.2,
  },
});
