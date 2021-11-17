import { StyleSheet } from 'react-native';
import { FontStyles } from '../../../../constants/theme';

export default StyleSheet.create({
  title: {
    ...FontStyles.Title,
    marginTop: 20,
    textAlign: 'center'
  },
  subtitle: {
    ...FontStyles.NormalGray,
    marginTop: 10,
    marginBottom: 30,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    padding: 30,
    width: '100%'
  },
  button: {
    marginTop: 30,
  },
});
