import { StyleSheet } from 'react-native';

import { Colors, FontStyles } from '@/constants/theme';

export default StyleSheet.create({
  title: {
    ...FontStyles.Title,
    marginTop: 20,
    textAlign: 'center',
  },
  errorText: {
    marginTop: 10,
    color: 'red',
  },
  subtitle: {
    ...FontStyles.NormalGray,
    marginTop: 5,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  input: {
    marginTop: 30,
    height: 100,
  },
  inputContainer: {
    backgroundColor: Colors.Gray.Secondary,
  },
  button: {
    marginTop: 30,
  },

  plugLogo: {
    flex: 1,
    width: 70,
    height: 33,
  },
});
