import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  HeaderComponent?: React.ReactNode;
  FooterComponent?: React.ReactNode;
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
  HeaderComponent,
  FooterComponent,
  FloatingComponent,
  ...props
}: Props) {
  const { bottom } = useSafeAreaInsets();
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
          style: fullHeight && styles.scrollView,
          contentContainerStyle: [
            fullHeight && styles.scrollviewContent,
            !!bottom && styles.extraBottom,
          ],
          ...scrollViewProps,
        }}
        closeOnOverlayTap
        keyboardAvoidingBehavior={isIos ? 'padding' : undefined}
        modalTopOffset={modalOffset}
        onOverlayPress={onClose}
        onClose={onClose}
        onClosed={onClosed}
        adjustToContentHeight={adjustToContentHeight}
        HeaderComponent={HeaderComponent}
        FooterComponent={FooterComponent}
        FloatingComponent={FloatingComponent}
        threshold={15}>
        {children}
      </Modalize>
    </Portal>
  );
}

export default Modal;
