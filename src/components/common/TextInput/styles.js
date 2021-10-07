import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/theme';

export default StyleSheet.create({
  inputStyle: {
    paddingTop: 13,
    paddingLeft: 20,
    paddingBottom: 13,
    paddingRight: 20,
    height: 56,
    width: '100%',
    color: Colors.White.Pure,
    borderRadius: 15,
    fontWeight: '600',
    fontSize: 18,
  },
  multiStyle: {
    height: 90,
    alignItems: 'flex-start',
  },
  innerLabelStyle: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    paddingRight: 14,
  },
  labledInputStyle: {
    flex: 12,
    paddingLeft: 0,
  },
  viewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderRadius: 15,
    backgroundColor: Colors.Black.Primary,
  },
  labledViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    paddingTop: 13,
    paddingLeft: 20,
    paddingBottom: 13,
  },
});
