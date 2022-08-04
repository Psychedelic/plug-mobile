import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  showcaseContainer: {
    flexGrow: 1,
    width: '100%',
    justifyContent: 'center',
  },
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
    borderBottomColor: '#ffffff16',
    borderBottomWidth: 1,
    width: '100%',
    paddingVertical: 24,
  },
});
