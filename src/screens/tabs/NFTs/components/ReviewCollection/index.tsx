import { t } from 'i18next';
import React from 'react';
import { View } from 'react-native';

import RainbowButton from '@/components/buttons/RainbowButton';
import { Text } from '@/components/common';
import Icon from '@/components/tokens/TokenIcon';
import useCustomToast from '@/hooks/useCustomToast';
import { CollectionInfo, NonFungibleStandard } from '@/interfaces/keyring';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addCustomCollection } from '@/redux/slices/user';

import styles from './styles';

interface Props {
  collection: CollectionInfo;
  handleModalClose: () => void;
}

function ReviewCollection({ collection, handleModalClose }: Props) {
  const { canisterId, standard, name } = collection;
  const { showInfo, showError, showSuccess } = useCustomToast();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.user.collectionsLoading);

  const handleAddCollection = () => {
    dispatch(
      addCustomCollection({
        nft: { canisterId, standard: standard as NonFungibleStandard },
        onSuccess: () => {
          handleModalClose();
          showSuccess(
            t('addCollection.successToastTitle'),
            t('addCollection.successToastMessage')
          );
        },
        onFailure: (e: string) => {
          handleModalClose();
          if (e.includes('The NFT is already registered')) {
            showInfo(
              t('addCollection.infoToastTitle'),
              t('addCollection.infoToastMessage', { name })
            );
          } else {
            showError(
              t('addCollection.errorToastTitle'),
              t('addCollection.errorToastMessage')
            );
          }
        },
      })
    );
  };

  return (
    <View style={styles.container}>
      <Text type="body1" style={styles.alert}>
        {t('addCollection.safetyAlert')}
      </Text>
      <View style={styles.collectionContainer}>
        <Icon logo={collection?.icon} />
        <Text type="body2" style={styles.name}>
          {collection.name || t('addCollection.noName')}
        </Text>
      </View>
      <RainbowButton
        text={t('addCollection.title')}
        onPress={handleAddCollection}
        loading={loading}
      />
    </View>
  );
}

export default ReviewCollection;
