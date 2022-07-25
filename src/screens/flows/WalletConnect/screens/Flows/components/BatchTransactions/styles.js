import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  flatListContentContainer: {
    paddingVertical: 10,
    flexGrow: 1,
  },
  flatListContainer: {
    width: '100%',
  },
  separatorContainer: {
    backgroundColor: Colors.Gray.Primary,
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    position: 'absolute',
    bottom: -8,
    alignSelf: 'center',
    elevation: 2,
    zIndex: 2,
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
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.Black.Secondary,
    marginBottom: 8,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
});
