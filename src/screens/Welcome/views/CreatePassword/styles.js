import { StyleSheet } from 'react-native';
import { FontStyles } from '../../../../constants/theme';

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
  switchContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  faceId: {
    ...FontStyles.NormalGray,
    fontSize: 16,
  },
  help: {
    ...FontStyles.SmallGray,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  rainbowButton: {
    marginTop: 35,
  },
  passwordInput: {
    marginTop: 28,
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
