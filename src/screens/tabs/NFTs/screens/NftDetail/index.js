import { useNavigation } from '@react-navigation/native';
import { t } from 'i18next';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Linking, Platform, View } from 'react-native';

import Badge from '@/commonComponents/Badge';
import Header from '@/commonComponents/Header';
import Modal from '@/commonComponents/Modal';
import NftDisplayer from '@/commonComponents/NftDisplayer';
import Button from '@/components/buttons/Button';
import RainbowButton from '@/components/buttons/RainbowButton';
import ActionSheet from '@/components/common/ActionSheet';
import Text from '@/components/common/Text';
import { ICNS_CANISTER_ID } from '@/constants/canister';
import { FontStyles } from '@/constants/theme';
import DownloadIcon from '@/icons/material/Download.svg';
import ViewIcon from '@/icons/material/View.svg';
import Routes from '@/navigation/Routes';
import { getNFTDetails } from '@/services/DAB';
import { downloadFile } from '@/utils/filesystem';
import { getAbsoluteType } from '@/utils/fileTypes';
import { deleteWhiteSpaces } from '@/utils/strings';

import Section from './components/Section';
import styles from './styles';

function NftDetail({ modalRef, handleClose, selectedNFT, ...props }) {
  const {
    url,
    canister,
    index,
    standard,
    name,
    icon,
    collectionDescription,
    type,
    collectionName,
  } = selectedNFT || {};
  const isICNS = canister === ICNS_CANISTER_ID;
  const nftName = `${collectionName} #${index}`;
  const navigation = useNavigation();

  const actionSheetRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [nftDetails, setNFTDetails] = useState(null);

  useEffect(() => {
    if (selectedNFT && !isICNS) {
      getNFTDetails({ index, canister, standard }).then(details =>
        setNFTDetails(details)
      );
    }
    return () => setNFTDetails(null);
  }, [selectedNFT]);

  const handleSend = () => {
    modalRef.current?.close();
    navigation.navigate(Routes.SEND_STACK, {
      screen: Routes.SEND,
      params: { nft: selectedNFT },
    });
  };

  const downloadNFT = () => {
    // TODO: Handle download error and permissons error
    setIsDownloading(true);
    downloadFile({
      filename: `NFT_${deleteWhiteSpaces(nftName)}${getAbsoluteType(
        selectedNFT?.type
      )}`,
      url: selectedNFT?.url,
      onFetched: () => setIsDownloading(false),
    });
  };

  const moreOptions = useMemo(
    () => ({
      title: t('nftDetail.moreTitle'),
      options: [
        {
          id: 1,
          label: t('nftDetail.moreOptions.view'),
          onPress: () => Linking.openURL(selectedNFT?.url),
          icon: Platform.select({ android: ViewIcon }),
        },
        {
          id: 2,
          label: t('nftDetail.moreOptions.download'),
          onPress: downloadNFT,
          icon: Platform.select({ android: DownloadIcon }),
        },
      ],
    }),
    [selectedNFT]
  );

  return (
    <>
      <Modal
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
        modalRef={modalRef}
        onClose={handleClose}
        {...props}>
        <Header
          center={
            <Text type="subtitle2">
              {isICNS ? name : index ? `#${index}` : ''}
            </Text>
          }
        />
        <View style={styles.content}>
          <View style={styles.nftDisplayerContainer}>
            <NftDisplayer
              ICNSName={isICNS ? name : undefined}
              url={url}
              type={type}
              style={styles.video}
              isDetailView
            />
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonWraperLeft}>
              <Button
                text={t('common.more')}
                onPress={actionSheetRef.current?.open}
                loading={isDownloading}
              />
            </View>
            <View style={styles.buttonWraperRight}>
              <RainbowButton
                text={t('common.send')}
                onPress={handleSend}
                disabled={isDownloading}
              />
            </View>
          </View>
          <Section
            title={t('nftDetail.collectionTitle')}
            style={styles.collectionSection}>
            <Badge value={collectionName} icon={icon} />
            <Badge value={isICNS ? name : `#${index}`} />
          </Section>
          {!!collectionDescription && (
            <Section title={t('nftDetail.descriptionTitle')}>
              <Text style={FontStyles.NormalGray}>{collectionDescription}</Text>
            </Section>
          )}
          {!!nftDetails?.metadata?.properties?.length && (
            <Section title={t('nftDetail.attributesTitle')}>
              {nftDetails.metadata.properties.map(prop => (
                <Badge key={prop.name} name={prop.name} value={prop.value} />
              ))}
            </Section>
          )}
        </View>
      </Modal>
      <ActionSheet
        modalRef={actionSheetRef}
        options={moreOptions.options}
        title={moreOptions.title}
      />
    </>
  );
}

export default NftDetail;
