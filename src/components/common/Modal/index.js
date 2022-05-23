import React from 'react';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';

import { isIos, withNotch } from '@/constants/platform';

import styles from './styles';

export const modalOffset = withNotch ? undefined : isIos ? 10 : 35;

function Modal({
  children,
  modalRef,
  onClose,
  fullHeight,
  adjustToContentHeight,
  scrollViewProps,
  modalStyle,
  ...props
}) {
  return (
    <Portal>
      <Modalize
        {...props}
        ref={modalRef}
        handlePosition="inside"
        modalStyle={[
          styles.modal,
          !adjustToContentHeight && styles.flex,
          modalStyle,
        ]}
        overlayStyle={styles.overlay}
        handleStyle={styles.handle}
        scrollViewProps={{
          keyboardShouldPersistTaps: 'always',
          keyboardDismissMode: 'none',
          showsVerticalScrollIndicator: false,
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
