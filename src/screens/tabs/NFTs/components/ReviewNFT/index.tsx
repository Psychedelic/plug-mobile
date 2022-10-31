// import { t } from 'i18next';
import { t } from 'i18next';
import React from 'react';
import { View } from 'react-native';

import RainbowButton from '@/components/buttons/RainbowButton';
import { Text } from '@/components/common';
import Icon from '@/components/tokens/TokenIcon'; // Check this
import useCustomToast from '@/hooks/useCustomToast';
import { NFTInfo, NonFungibleStandard } from '@/interfaces/keyring';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addCustomNFT } from '@/redux/slices/user';

import styles from './styles';

interface Props {
  nft: NFTInfo;
  handleModalClose: () => void;
}

function ReviewNFT({ nft, handleModalClose }: Props) {
  const { canisterId, standard } = nft;
  const { showInfo } = useCustomToast();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.user.collectionsLoading);

  const handleAddNFT = () => {
    dispatch(
      addCustomNFT({
        nft: { canisterId, standard: standard as NonFungibleStandard },
        onSuccess: handleSuccess,
      })
    );
  };

  const handleSuccess = () => {
    handleModalClose();
    showInfo(t('addNFT.addedToastTitle'), t('addNFT.addedToastMessage'));
  };

  return (
    <View style={styles.container}>
      <Text type="body1" style={styles.alert}>
        {t('addNFT.safetyAlert')}
      </Text>
      {/* {error ? renderError() : renderToken()} */}
      <View style={styles.nftContainer}>
        <Icon logo={nft?.icon} />
        <Text type="body2" style={styles.name}>
          {nft.name || t('addNFT.noName')}
        </Text>
      </View>
      <RainbowButton
        text={t('addNFT.title')}
        onPress={handleAddNFT}
        // disabled={loadingBalance || !!error}
        loading={loading}
      />
    </View>
  );
}

export default ReviewNFT;
