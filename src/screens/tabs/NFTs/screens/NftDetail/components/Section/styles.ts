import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  section: {
    borderTopColor: Colors.Gray.Primary,
    borderTopWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  title: {
    color: Colors.White.Primary,
  },
  content: {
    paddingTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
