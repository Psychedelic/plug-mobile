import { t } from 'i18next';
import React, { useCallback, useRef } from 'react';
import { Modalize } from 'react-native-modalize';

import ScrollableButton from '@/components/buttons/ScrollableButton';
import { Modal } from '@/components/common';

import useSteps from './hooks/useSteps';
import styles from './styles';

interface Props {
  scrollPosition: number;
}

export function AddToken({ scrollPosition }: Props) {
  const modalRef = useRef<Modalize>(null);

  const handleModalClose = useCallback(() => {
    modalRef.current?.close();
  }, [modalRef]);

  const { currentStep, setStep } = useSteps({ handleModalClose });

  return (
    <>
      <ScrollableButton
        text={t('addToken.title')}
        scrollPosition={scrollPosition}
        onPress={() => modalRef?.current?.open()}
        buttonStyle={styles.buttonContainer}
      />
      <Modal
        modalRef={modalRef}
        disableScrollIfPossible={false}
        adjustToContentHeight={currentStep?.adjustModalContent}
        fullHeight={currentStep?.fullHeight}
        HeaderComponent={currentStep.header}
        onClosed={() => setStep(0)}>
        {currentStep.component}
      </Modal>
    </>
  );
}
