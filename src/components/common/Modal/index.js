import React from 'react';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';

import styles from './styles';

function Modal({
  children,
  modalRef,
  onClose,
  fullHeight,
  scrollViewProps,
  ...props
}) {
  return (
    <Portal>
      <Modalize
        {...props}
        ref={modalRef}
        handlePosition={'inside'}
        modalStyle={styles.modalStyle}
        overlayStyle={styles.overlayStyle}
        handleStyle={styles.handleStyle}
        scrollViewProps={{
          keyboardShouldPersistTaps: 'always',
          keyboardDismissMode: 'none',
          ...(fullHeight && {
            contentContainerStyle: { height: '100%' },
          }),
          ...scrollViewProps,
        }}
        modalTopOffset={10}
        onClose={onClose}
        threshold={15}>
        {children}
      </Modalize>
    </Portal>
  );
}

export default Modal;
