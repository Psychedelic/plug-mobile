import { t } from 'i18next';
import React, { useRef, useState } from 'react';
import { Modalize } from 'react-native-modalize';

import ScrollableButton from '@/components/buttons/ScrollableButton';
import { ActionButton, Header, Modal, Text } from '@/components/common';
import { CollectionInfo } from '@/interfaces/keyring';

import CustomCollection from '../CustomCollection';
import ReviewCollection from '../ReviewCollection';
import styles from './styles';

interface Props {
  scrollPosition: number;
}

function AddCollection({ scrollPosition }: Props) {
  const modalRef = useRef<Modalize>(null);
  const [selectedCollection, setSelectedCollection] =
    useState<CollectionInfo>();
  const showReviewCollection = !!selectedCollection;

  const handleModalClose = () => {
    modalRef.current?.close();
    cleanState();
  };

  const cleanState = () => setSelectedCollection(undefined);

  return (
    <>
      <ScrollableButton
        text={t('addCollection.title')}
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
              showReviewCollection && (
                <ActionButton onPress={cleanState} label={t('common.back')} />
              )
            }
            center={
              <Text style={styles.title} type="subtitle3">
                {t('addCollection.customCollection')}
              </Text>
            }
            right={
              <ActionButton
                label={t('common.close')}
                onPress={handleModalClose}
              />
            }
          />
        }>
        {showReviewCollection ? (
          <ReviewCollection
            collection={selectedCollection}
            handleModalClose={handleModalClose}
          />
        ) : (
          <CustomCollection setSelectedCollection={setSelectedCollection} />
        )}
      </Modal>
    </>
  );
}
export default AddCollection;
