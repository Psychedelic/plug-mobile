import { Platform, StyleSheet } from 'react-native';

const rootSize = 41;
const activitySize = 19;

const zIndexStyle = Platform.select({
  ios: { zIndex: 1 },
  android: { elevation: 1 },
});

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
    ...zIndexStyle,
  },
  activityImage: {
    borderRadius: 22,
  },
});
