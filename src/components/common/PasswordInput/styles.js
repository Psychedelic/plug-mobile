import { StyleSheet } from 'react-native';

import { Colors } from '../../../constants/theme';

export default StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: 'red',
  },
  input: {
    backgroundColor: Colors.Gray.Secondary,
    paddingRight: 30,
  },
  eyeContainer: {
    position: 'absolute',
    right: 20,
    top: 17,
  },
});
