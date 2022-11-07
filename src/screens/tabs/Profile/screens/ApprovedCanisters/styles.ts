import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  itemShowcase: {
    paddingVertical: 20,
    marginBottom: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.Divider[1],
  },
  canister: {
    marginBottom: 24,
  },
  container: {
    paddingHorizontal: 20,
  },
});
