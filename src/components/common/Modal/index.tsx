import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';

import { isIos, withNotch } from '@/constants/platform';

import styles from './styles';

export const modalOffset = withNotch ? undefined : isIos ? 10 : 35;

interface Props {
  children: React.ReactNode;
  modalRef: React.RefObject<Modalize>;
  onClose?: () => void;
  onClosed?: () => void;
  fullHeight?: boolean;
  adjustToContentHeight?: boolean;
  scrollViewProps?: any;
  modalStyle?: StyleProp<ViewStyle>;
  FloatingComponent?: React.ReactNode;
}

function Modal({
  children,
  modalRef,
  onClose,
  onClosed,
  fullHeight,
  adjustToContentHeight,
  scrollViewProps,
  modalStyle,
  FloatingComponent,
  ...props
}: Props) {
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
            style: styles.scrollView,
            contentContainerStyle: styles.scrollviewContent,
          }),
          ...scrollViewProps,
        }}
        closeOnOverlayTap
        keyboardAvoidingBehavior={isIos ? 'padding' : undefined}
        modalTopOffset={modalOffset}
        onOverlayPress={onClose}
        onClose={onClose}
        onClosed={onClosed}
        adjustToContentHeight={adjustToContentHeight}
        FloatingComponent={FloatingComponent}
        threshold={15}>
        {children}
      </Modalize>
    </Portal>
  );
}

export default Modal;
