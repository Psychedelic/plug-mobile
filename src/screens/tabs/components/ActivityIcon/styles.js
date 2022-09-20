import { StyleSheet } from 'react-native';

const rootSize = 41;
const activitySize = 19;

export default StyleSheet.create({
  root: {
    height: rootSize,
    width: rootSize,
    borderRadius: 26,
    marginRight: 12,
  },
  activity: {
    position: 'absolute',
    right: -5,
    top: -5,
    borderRadius: 26,
    height: activitySize,
    width: activitySize,
    zIndex: 1,
    elevation: 1,
  },
  activityImage: {
    borderRadius: 22,
  },
});
