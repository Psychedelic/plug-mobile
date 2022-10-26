import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';
export default StyleSheet.create({
  container: {
    width: '92%',
    padding: 16,
    borderRadius: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  message: {
    fontSize: 14,
    color: Colors.White.Primary,
  },
  title: {
    marginLeft: 10,
    fontSize: 14,
    color: Colors.White.Pure,
  },
  titleContainer: {
    flexDirection: 'row',
  },
});
