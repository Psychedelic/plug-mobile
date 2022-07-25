import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  listContentContainer: {
    paddingVertical: 10,
    flexGrow: 1,
  },
  list: {
    width: '100%',
  },
  appIcon: {
    height: 28,
    width: 28,
  },
  appIconContainer: {
    backgroundColor: Colors.Black.Pure,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  itemSubtitle: {
    color: Colors.White.Secondary,
    marginTop: 2,
  },
  item: {
    position: 'relative',
  },
  itemDataContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.Black.Secondary,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginVertical: 4,
  },
  separatorContainer: {
    backgroundColor: Colors.Gray.Primary,
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    bottom: -16,
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 2,
  },
});
