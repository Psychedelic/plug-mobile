import { StyleSheet } from 'react-native';

const rootSize = 41;
const activitySize = 19;

export default StyleSheet.create({
  root: {
    height: rootSize,
    width: rootSize,
    borderRadius: 26,
    position: 'relative',
    marginRight: 12,
  },
  activity: {
    position: 'absolute',
    right: -5,
    top: -5,
    borderRadius: 26,
    zIndex: 1,
    height: activitySize,
    width: activitySize,
  },
  activityImage: {
    borderRadius: 22,
  },
});
