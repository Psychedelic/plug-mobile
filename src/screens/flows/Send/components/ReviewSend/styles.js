import { StyleSheet } from 'react-native';

import { Colors, FontStyles } from '@/constants/theme';

export default StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingBottom: 45,
  },
  row: {
    height: 55,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  to: {
    borderRadius: 8,
    backgroundColor: Colors.Gray.Tertiary,
    width: 41,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 25,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  toRow: {
    paddingRight: 9,
  },
  valid: {
    marginTop: 4,
    color: Colors.ActionBlue,
  },
  headerTitle: {
    ...FontStyles.Subtitle2,
    color: Colors.White.Primary,
  },
  title: {
    ...FontStyles.Title2,
    color: Colors.White.Primary,
  },
  subtitle: {
    ...FontStyles.Subtitle3,
    color: Colors.White.Secondary,
  },
});
