import React, { useCallback, useRef } from 'react';
import { Image } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { Modal, Touchable } from '@/components/common';
import animationScales from '@/utils/animationScales';

import Add from './assets/Add.png';
import useSteps from './hooks/useSteps';
import styles from './styles';

export function AddToken() {
  const modalRef = useRef<Modalize>(null);

  const handleModalClose = useCallback(() => {
    modalRef.current?.close();
  }, [modalRef]);

  const { currentStep, setStep } = useSteps({ handleModalClose });

  return (
    <>
      <Touchable
        onPress={() => modalRef?.current?.open()}
        scale={animationScales.medium}
        style={styles.buttonContainer}>
        <Image source={Add} />
      </Touchable>
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
