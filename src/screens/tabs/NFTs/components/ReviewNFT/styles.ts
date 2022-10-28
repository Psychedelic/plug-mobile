import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';
import { fontMaker } from '@/utils/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  alert: {
    color: Colors.White.Secondary,
    textAlign: 'center',
  },
  name: {
    ...fontMaker({ color: Colors.White.Primary }),
    marginLeft: 12,
  },
  nftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderTopColor: Colors.Divider[1],
    borderBottomColor: Colors.Divider[1],
    marginTop: 36,
    marginBottom: 40,
  },
  // tokenContainer: {
  //   marginVertical: 36,
  //   height: 70,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   borderWidth: 1,
  //   borderTopColor: Colors.Divider[1],
  //   borderBottomColor: Colors.Divider[1],
  //   padding: 14,
  // },
  // loader: {
  //   justifyContent: 'center',
  // },
  // errorTextContainer: {
  //   marginLeft: 8,
  // },
  // errorTitle: {
  //   ...fontMaker({ color: Colors.White.Primary }),
  // },
  // errorSubtitle: {
  //   ...fontMaker({ color: Colors.Gray.Pure, style: 'italic' }),
  // },
});
