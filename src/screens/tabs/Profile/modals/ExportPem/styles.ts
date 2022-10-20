import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  selectAccountTitle: {
    color: Colors.White.Secondary,
    textAlign: 'center',
    paddingBottom: 16,
    borderBottomColor: Colors.Divider[1],
    borderBottomWidth: 1,
  },
  accountsContainer: {
    flex: 1,
    paddingVertical: 18,
  },
  safeCheckLabel: {
    color: Colors.White.Secondary,
    marginLeft: 12,
  },
  checkbox: {
    marginTop: 12,
    marginBottom: 48,
  },
  extraMargin: {
    marginBottom: 20,
  },
});
