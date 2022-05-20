import { StyleSheet } from 'react-native';

import { isIos } from '@/constants/platform';
import { Colors } from '@/constants/theme';

export const modalOffset = isIos ? 10 : 35;

export default StyleSheet.create({
  modal: {
    zIndex: 5,
    marginTop: 'auto',
    backgroundColor: Colors.Black.Pure,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  flexOffset: {
    marginTop: modalOffset,
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(21, 22, 28, 0.6)', //TODO: I think we should remove this, looks better without it
  },
  handle: {
    alignSelf: 'center',
    top: 10,
    width: 30,
    height: 5,
    borderRadius: 5,
    backgroundColor: Colors.Gray.Primary,
  },
  scrollviewContent: {
    height: '100%',
  },
});
