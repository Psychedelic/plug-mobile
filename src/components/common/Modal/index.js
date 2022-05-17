import React from 'react';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';

import { isIos } from '@/constants/platform';

import styles from './styles';

function Modal({
  children,
  modalRef,
  onClose,
  fullHeight,
  adjustToContentHeight,
  scrollViewProps,
  ...props
}) {
  return (
    <Portal>
      <Modalize
        {...props}
        ref={modalRef}
        handlePosition="inside"
        modalStyle={[
          styles.modalStyle,
          !adjustToContentHeight && styles.flexStyle,
        ]}
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
        closeOnOverlayTap
        keyboardAvoidingBehavior={isIos ? 'padding' : 'height'}
        modalTopOffset={10}
        onOverlayPress={onClose}
        onClose={onClose}
        adjustToContentHeight={adjustToContentHeight}
        threshold={15}>
        {children}
      </Modalize>
    </Portal>
  );
}

export default Modal;
