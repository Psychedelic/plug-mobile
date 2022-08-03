import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonStyle: {
    minWidth: '48%',
  },
  gradient: {
    top: -30,
    height: 30,
    width: '100%',
    alignSelf: 'center',
    position: 'absolute',
  },
  bottomContainer: {
    width: '100%',
    paddingBottom: 20,
  },
});
