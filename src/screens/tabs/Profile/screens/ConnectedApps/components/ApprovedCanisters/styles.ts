import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  valid: {
    color: Colors.ActionBlue,
  },
  itemShowcase: {
    paddingVertical: 20,
    marginBottom: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.Gray.Divider,
  },
  canister: {
    marginBottom: 24,
  },
  modalStyle: {
    paddingHorizontal: 20,
  },
});
