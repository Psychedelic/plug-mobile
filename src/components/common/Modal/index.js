import React, { useMemo } from 'react';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';

import { isIos, withNotch } from '@/constants/platform';

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
  const modalOffset = useMemo(() => (withNotch ? undefined : 10), []);

  return (
    <Portal>
      <Modalize
        {...props}
        ref={modalRef}
        handlePosition="inside"
        modalStyle={[styles.modal, !adjustToContentHeight && styles.flex]}
        overlayStyle={styles.overlay}
        handleStyle={styles.handle}
        scrollViewProps={{
          keyboardShouldPersistTaps: 'always',
          keyboardDismissMode: 'none',
          overScrollMode: 'never',
          ...(fullHeight && {
            contentContainerStyle: styles.scrollviewContent,
          }),
          ...scrollViewProps,
        }}
        closeOnOverlayTap
        keyboardAvoidingBehavior={isIos ? 'padding' : undefined}
        modalTopOffset={modalOffset}
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
