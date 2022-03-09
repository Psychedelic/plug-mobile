import { StyleSheet } from 'react-native';

import { Colors } from '../../../constants/theme';

const inputHeight = 60;
const commonBorderRadius = 15;

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
  disabledContainer: {
    opacity: 0.3,
  },
  focusedGradient: {
    borderRadius: commonBorderRadius,
    height: inputHeight,
    width: '100%',
    top: -2,
    position: 'absolute',
  },
  container: {
    backgroundColor: Colors.Gray.Secondary,
    borderRadius: commonBorderRadius,
    marginHorizontal: 2,
  },
});
