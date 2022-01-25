import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    zIndex: 0,
  },
  loading: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
  activityIndicator: {
    ...StyleSheet.absoluteFill,
  },
  row: {
    marginBottom: 30,
    marginTop: 10,
  },
});
