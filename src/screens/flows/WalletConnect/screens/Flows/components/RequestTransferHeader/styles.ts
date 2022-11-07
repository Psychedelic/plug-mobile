import { StyleSheet } from 'react-native';

const opacityWhite = '#ffffff16';

export default StyleSheet.create({
  topTitle: {
    marginBottom: 6,
  },
  leftContainer: {
    alignItems: 'flex-start',
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
  infoUserHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: opacityWhite,
    borderBottomWidth: 1,
    width: '100%',
    paddingVertical: 24,
  },
});
