import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/theme';

// login

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    background: Colors.Black.primary,
    padding: 30,
    width: '100%',
    flex: 1,
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 13,
    backgroundColor: Colors.Gray.Primary,
    borderRadius: 15,
    minWidth: '84%',
    fontSize: 18,
    color: Colors.White.Pure,
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
