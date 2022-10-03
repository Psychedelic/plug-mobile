import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  warningContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  learnMore: {
    color: Colors.WarningYellow,
    textDecorationLine: 'underline',
  },
  unknownTitle: {
    color: Colors.WarningYellow,
  },
  warningIcon: {
    width: 20,
    height: 22,
    marginRight: 5,
    resizeMode: 'contain',
  },
  unknownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
