import React from 'react';
import { Portal } from 'react-native-portalize';
import { Modalize } from 'react-native-modalize';

import { Colors } from '../../constants/theme';

const Modal = ({ children, modalRef, onClose, fullHeight, ...props }) => {
  return (
    <Portal>
      <Modalize
        {...props}
        ref={modalRef}
        handlePosition={'inside'}
        modalStyle={modalStyle}
        overlayStyle={overlayStyle}
        handleStyle={handleStyle}
        scrollViewProps={{
          keyboardShouldPersistTaps: 'always',
          keyboardDismissMode: 'none',
          ...(fullHeight && {
            contentContainerStyle: { height: '100%' },
          }),
        }}
        modalTopOffset={10}
        onClose={onClose}
        threshold={15}>
        {children}
      </Modalize>
    </Portal>
  );
};

export default Modal;

const modalStyle = {
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
};

const overlayStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: 'rgba(21, 22, 28, 0.6)',
};

const handleStyle = {
  alignSelf: 'center',
  top: 10,
  width: 30,
  height: 5,
  borderRadius: 5,
  backgroundColor: Colors.Gray.Primary,
};
