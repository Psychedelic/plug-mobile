import { StyleSheet } from 'react-native';
import { FontStyles, Colors } from '../../constants/theme';

export default StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  title: {
    ...FontStyles.Subtitle2,
  },
  input: {
    backgroundColor: Colors.Gray.Secondary,
  },
  errorText: {
    marginTop: 5,
    color: 'red',
  },
});
