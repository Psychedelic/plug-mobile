import { StyleSheet } from 'react-native';

import { FontStyles, Colors } from '../../../../constants/theme';

export default StyleSheet.create({
  title: {
    ...FontStyles.Title,
    marginTop: 20,
    textAlign: 'center',
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
    marginVertical: 30,
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
