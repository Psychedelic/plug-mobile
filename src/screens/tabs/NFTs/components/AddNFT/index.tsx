import { t } from 'i18next';
import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { Modalize } from 'react-native-modalize';

import {
  ActionButton,
  Header,
  Modal,
  Text,
  Touchable,
} from '@/components/common';
import { Nullable } from '@/interfaces/general';
import { NFTInfo } from '@/interfaces/keyring';
import animationScales from '@/utils/animationScales';

import Add from '../../../Tokens/components/AddToken/assets/Add.png'; // check this
import CustomNFT from '../CustomNFT';
import ReviewNFT from '../ReviewNFT';
import styles from './styles';

function AddNFT() {
  const modalRef = useRef<Modalize>(null);
  const [selectedNFT, setSelectedNFT] = useState<Nullable<NFTInfo>>(null);
  const showReviewNFT = !!selectedNFT;

  const handleModalClose = () => {
    modalRef.current?.close();
    cleanState();
  };

  const cleanState = () => setSelectedNFT(null);

  return (
    <>
      <Touchable
        onPress={() => modalRef?.current?.open()}
        scale={animationScales.medium}
        style={styles.buttonContainer}>
        <Image source={Add} />
      </Touchable>
      <Modal
        onClosed={cleanState}
        modalRef={modalRef}
        disableScrollIfPossible={false}
        adjustToContentHeight
        HeaderComponent={
          <Header
            left={
              showReviewNFT && (
                <ActionButton onPress={cleanState} label={t('common.back')} />
              )
            }
            center={
              <Text style={styles.title} type="subtitle3">
                {t('addNFT.customNFT')}
              </Text>
            }
            right={
              <ActionButton
                label={t('common.close')}
                onPress={handleModalClose} // check if this ok
              />
            }
          />
        }>
        {showReviewNFT ? (
          <ReviewNFT nft={selectedNFT} handleModalClose={handleModalClose} />
        ) : (
          <CustomNFT setSelectedNFT={setSelectedNFT} />
        )}
      </Modal>
    </>
  );
}
export default AddNFT;
