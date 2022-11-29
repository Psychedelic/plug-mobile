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
  collectionContainer: {
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
});
