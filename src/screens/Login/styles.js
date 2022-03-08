import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/theme';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: Colors.Black.primary,
    padding: 30,
    width: '100%',
    flex: 1,
  },
  input: {
    width: '84%',
  },
  plugIcon: {
    height: 116,
    resizeMode: 'contain',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.White.Primary,
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 27,
  },
  componentMargin: {
    marginTop: 27,
  },
  buttonMargin: {
    marginTop: 27,
    minWidth: '84%',
  },
  errorText: {
    marginTop: 5,
    color: 'red',
  },
});
