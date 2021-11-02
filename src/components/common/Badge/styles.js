import { StyleSheet, useColorScheme } from 'react-native';
import { Colors, FontStyles } from '../../../constants/theme';

export default StyleSheet.create({
  root: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
    justifyContent: 'center',
    minHeight: 52,
    borderColor: Colors.Gray.Primary,
    borderWidth: 1,
    alignSelf: 'flex-start'
  },
  name: {
    ...FontStyles.SmallerGray,
    textTransform: 'uppercase',
  },
  value: {
    ...FontStyles.Small,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    objectFit: 'cover',
  },
  iconContainer: {
    backgroundColor: Colors.Gray.Primary,
    overflow: 'hidden',
    width: 30,
    height: 30,
    borderRadius: 30,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});