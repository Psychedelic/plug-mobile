import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export const loaderColor = Colors.White.Primary;
export const incognitoColor = Colors.White.Pure;

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
  tokenContainer: {
    marginVertical: 36,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderTopColor: Colors.Divider[1],
    borderBottomColor: Colors.Divider[1],
    padding: 14,
  },
  logo: {
    height: 40,
    width: 40,
    borderColor: Colors.Divider[1],
    borderWidth: 1,
    borderRadius: 100,
    marginRight: 12,
  },
  incognitoLogo: {
    backgroundColor: Colors.Black.Primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textWhite: {
    color: Colors.White.Primary,
  },
  amount: {
    color: Colors.White.Secondary,
  },
});
