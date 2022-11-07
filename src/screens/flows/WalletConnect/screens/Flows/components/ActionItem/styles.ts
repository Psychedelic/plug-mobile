import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  appIcon: {
    height: 40,
    width: 40,
  },
  title: {
    textTransform: 'capitalize',
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
    maxWidth: '80%',
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
});
