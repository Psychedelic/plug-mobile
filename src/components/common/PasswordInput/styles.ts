import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';
import { fontMaker } from '@/utils/fonts';

export default StyleSheet.create({
  container: {
    width: '100%',
  },
  errorText: {
    marginTop: 5,
    color: 'red',
  },
  inputContainer: {
    backgroundColor: Colors.Gray.Secondary,
  },
  disabledContainer: {
    opacity: 0.3,
  },
  textInput: {
    ...fontMaker({ size: 18, color: Colors.White.Pure }),
    fontFamily: undefined, // Disabling custom font because of problem with Inter and secure text entry
    fontWeight: 'bold',
  },
});
