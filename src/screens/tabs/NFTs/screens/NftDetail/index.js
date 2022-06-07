import { t } from 'i18next';
import React, { useMemo, useRef, useState } from 'react';
import { Linking, Platform, Share, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import Badge from '@/commonComponents/Badge';
import Header from '@/commonComponents/Header';
import Modal from '@/commonComponents/Modal';
import NftDisplayer from '@/commonComponents/NftDisplayer';
import Button from '@/components/buttons/Button';
import RainbowButton from '@/components/buttons/RainbowButton';
import ActionSheet from '@/components/common/ActionSheet';
import { FontStyles } from '@/constants/theme';
import useGetType from '@/hooks/useGetType';
import DownloadIcon from '@/icons/svg/material/Download.svg';
import ShareIcon from '@/icons/svg/material/Share.svg';
import ViewIcon from '@/icons/svg/material/View.svg';
import Send from '@/screens/flows/Send';
import { downloadFile } from '@/utils/filesystem';
import { getAbsoluteType } from '@/utils/fileTypes';
import { deleteWhiteSpaces } from '@/utils/strings';

import Section from './components/Section';
import styles from './styles';

const NftDetail = ({ modalRef, handleClose, selectedNFT, ...props }) => {
  const isCapCrowns = selectedNFT?.collection === 'CAP Crowns';
  const nftName = `${selectedNFT?.collection} #${selectedNFT?.index}`;
  const actionSheetRef = useRef(null);
  const [type, setType] = useState(null);
  const userCollection = useSelector(state => state.user.collections) || [];
  const [isDownloading, setIsDownloading] = useState(false);
  const selectedCollection = userCollection.find(
    collection => collection.name === selectedNFT?.collection
  );

  useGetType(selectedNFT?.url, setType);

  const handleShare = () => {
    /* TODO: Change the link for the correct NFT View Page when it's ready */
    Share.share({
      message: `${selectedNFT?.url}`,
      url: selectedNFT?.url,
      title: nftName,
    });
  };

  const sendRef = useRef(null);

  const handleSend = () => {
    sendRef.current?.open();
  };

  const downloadNFT = () => {
    // TODO: Handle download error
    setIsDownloading(true);
    downloadFile({
      filename: `/NFT_${deleteWhiteSpaces(nftName)}${getAbsoluteType(type)}`,
      url: selectedNFT?.url,
      type,
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
          label: t('nftDetail.moreOptions.share'),
          onPress: handleShare,
          icon: Platform.select({ android: ShareIcon }),
        },
        {
          id: 3,
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
            <Text style={FontStyles.Subtitle2}>{`#${selectedNFT?.index}`}</Text>
          }
        />
        <View style={styles.content}>
          <View style={styles.nftDisplayerContainer}>
            <NftDisplayer
              url={selectedNFT?.url}
              type={type}
              style={styles.video}
              isDetailView
            />
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonWraperLeft}>
              <Button
                variant="gray"
                text={t('common.more')}
                onPress={actionSheetRef.current?.open}
                loading={isDownloading}
              />
            </View>
            <View style={styles.buttonWraperRight}>
              <RainbowButton
                text={t('common.send')}
                onPress={handleSend}
                disabled={isCapCrowns || isDownloading}
              />
            </View>
          </View>
          <Section
            title={t('nftDetail.collectionTitle')}
            style={styles.collectionSection}>
            <Badge
              value={selectedNFT?.collection}
              icon={selectedCollection?.icon}
            />
            <Badge value={`#${selectedNFT?.index}`} />
          </Section>
          {!!selectedCollection?.description && (
            <Section title={t('nftDetail.descriptionTitle')}>
              <Text style={FontStyles.NormalGray}>
                {selectedCollection?.description}
              </Text>
            </Section>
          )}
          {selectedNFT?.metadata?.properties?.length && (
            <Section title={t('nftDetail.attributesTitle')}>
              {selectedNFT?.metadata?.properties?.map(prop => (
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
      <Send
        modalRef={sendRef}
        nft={selectedNFT}
        onSuccess={() => modalRef.current?.close()}
      />
    </>
  );
};

export default NftDetail;
