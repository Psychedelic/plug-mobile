import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  content: {
    paddingHorizontal: 12,
    paddingBottom: 20,
    paddingTop: 10,
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
    marginBottom: 20,
    marginLeft: 10,
    marginTop: 20,
  },
  accountItem: {
    marginBottom: 8,
  },
  plusIcon: {
    marginRight: 8,
  },
  selectedAccount: {
    color: Colors.ActionBlue,
  },
  threeDots: {
    marginLeft: 'auto',
    justifyContent: 'center',
  },
  checkbox: {
    marginLeft: 6,
  },
});
