import { StyleSheet } from 'react-native';

import { Colors, FontStyles } from '@/constants/theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.Black.Pure,
    width: '100%',
    borderRadius: 15,
    flexWrap: 'wrap',
    flexDirection: 'row',
    height: 237,
    paddingHorizontal: 40,
    paddingVertical: 25,
    alignContent: 'space-between',
    position: 'relative',
    borderColor: Colors.Gray.Secondary,
    borderWidth: 1,
  },
  item: {
    width: '50%',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reveal: {
    ...FontStyles.Normal,
    fontWeight: 'bold',
    marginTop: 6,
  },
});
