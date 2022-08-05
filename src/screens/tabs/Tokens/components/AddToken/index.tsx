import React, { useRef } from 'react';
import { Modalize } from 'react-native-modalize';

import Header from '@/components/common/Header';
import Modal from '@/components/common/Modal';
import Text from '@/components/common/Text';
import Touchable from '@/components/common/Touchable';
import animationScales from '@/utils/animationScales';

import useSteps from './hooks/useSteps';

export function AddToken() {
  const modalRef = useRef<Modalize>(null);
  const { center, component } = useSteps();

  return (
    <>
      <Touchable
        onPress={() => modalRef?.current?.open()}
        scale={animationScales.medium}
        style={{
          height: 48,
          width: 48,
          backgroundColor: 'blue',
          position: 'absolute',
          bottom: 24,
          right: 20,
          borderRadius: 100,
        }}
      />
      <Modal modalRef={modalRef}>
        <Header center={<Text type="subtitle2">{center}</Text>} />
        {component}
      </Modal>
    </>
  );
}
