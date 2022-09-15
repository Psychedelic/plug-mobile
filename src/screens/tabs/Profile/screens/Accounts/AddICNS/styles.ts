import { StyleSheet } from 'react-native';

import { MEDIUM } from '@/constants/fonts';
import { Colors } from '@/constants/theme';
import { fontMaker } from '@/utils/fonts';

const commonTextStyle = {
  ...fontMaker({
    size: 17,
    weight: MEDIUM,
  }),
};

export default StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  selector: {
    marginTop: 32,
    marginBottom: 24,
    flex: 1,
    width: '100%',
    borderRadius: 15,
    alignSelf: 'center',
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    justifyContent: 'space-between',
    backgroundColor: Colors.Black.Primary,
  },
  arrowIcon: {
    transform: [{ rotate: '-90deg' }],
  },
  buttonStyle: {
    marginBottom: 30,
  },
  actionMessage: {
    ...commonTextStyle,
    color: Colors.ActionBlue,
    textDecorationLine: 'underline',
  },
  message: {
    paddingBottom: 34,
    ...commonTextStyle,
    textAlign: 'center',
    color: Colors.White.Secondary,
  },
  icnsInfo: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.White.Secondary,
    paddingBottom: 24,
  },
  icnsLogo: {
    width: 60,
    height: 20,
  },
});
