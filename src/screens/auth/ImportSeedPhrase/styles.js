import { StyleSheet } from 'react-native';

import { Colors, FontStyles } from '@/constants/theme';

export default StyleSheet.create({
  title: {
    ...FontStyles.Title,
    color: Colors.White.Primary,
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
    backgroundColor: Colors.Gray.Secondary,
    marginTop: 30,
  },
  button: {
    marginTop: 30,
  },
  plugLogoContainer: {
    width: 70,
    height: 33,
  },
  plugLogo: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
});
