import React, { useRef } from 'react';
import { Image } from 'react-native';
import { Modalize } from 'react-native-modalize';

import Header from '@/components/common/Header';
import Modal from '@/components/common/Modal';
import Text from '@/components/common/Text';
import Touchable from '@/components/common/Touchable';
import animationScales from '@/utils/animationScales';

import Add from './assets/Add.png';
import useSteps from './hooks/useSteps';
import styles from './styles';

export function AddToken() {
  const modalRef = useRef<Modalize>(null);
  const { center, component } = useSteps();

  return (
    <>
      <Touchable
        onPress={() => modalRef?.current?.open()}
        scale={animationScales.medium}
        style={styles.buttonContainer}>
        <Image source={Add} />
      </Touchable>
      <Modal modalRef={modalRef}>
        <Header center={<Text type="subtitle2">{center}</Text>} />
        {component}
      </Modal>
    </>
  );
}
