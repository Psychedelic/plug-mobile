import { t } from 'i18next';
import React, { useRef, useState } from 'react';
import { Modalize } from 'react-native-modalize';

import ScrollableButton from '@/components/buttons/ScrollableButton';
import { ActionButton, Header, Modal, Text } from '@/components/common';
import { Nullable } from '@/interfaces/general';
import { NFTInfo } from '@/interfaces/keyring';

import CustomNFT from '../CustomNFT';
import ReviewNFT from '../ReviewNFT';
import styles from './styles';

interface Props {
  scrollPosition: number;
}

function AddNFT({ scrollPosition }: Props) {
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
      <ScrollableButton
        text={t('addNFT.title')}
        scrollPosition={scrollPosition}
        onPress={() => modalRef?.current?.open()}
        buttonStyle={styles.buttonContainer}
      />
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
