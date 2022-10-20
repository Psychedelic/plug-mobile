import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    zIndex: 0,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
  activityIndicator: {
    ...StyleSheet.absoluteFillObject,
  },
  row: {
    marginBottom: 30,
    marginTop: 10,
  },
  accountItem: {
    marginBottom: 20,
  },
  plusIcon: {
    marginRight: 8,
  },
  selectedAccount: {
    color: Colors.ActionBlue,
  },
});
