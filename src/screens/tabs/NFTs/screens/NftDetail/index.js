import i18next, { t } from 'i18next';
import React, { useRef, useState } from 'react';
import {
  ActionSheetIOS,
  Linking,
  Platform,
  Share,
  Text,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';

import Badge from '@/commonComponents/Badge';
import Header from '@/commonComponents/Header';
import Modal from '@/commonComponents/Modal';
import NftDisplayer from '@/commonComponents/NftDisplayer';
import Button from '@/components/buttons/Button';
import RainbowButton from '@/components/buttons/RainbowButton';
import { isIos } from '@/constants/platform';
import { FontStyles } from '@/constants/theme';
import useGetType from '@/hooks/useGetType';
import Send from '@/screens/flows/Send';
import { getAbsoluteType } from '@/utils/fileTypes';
import { deleteWhiteSpaces } from '@/utils/strings';

import Section from './components/Section';
import styles from './styles';

const moreOptions = i18next.t('nftDetail.moreOptions', { returnObjects: true });

const NftDetail = ({ modalRef, handleClose, selectedNFT, ...props }) => {
  const isCapCrowns = selectedNFT?.collection === 'CAP Crowns';
  const nftName = `${selectedNFT?.collection} #${selectedNFT?.index}`;
  const [type, setType] = useState(null);
  const userCollection = useSelector(state => state.user.collections) || [];
  const selectedCollection = userCollection.find(
    collection => collection.name === selectedNFT?.collection,
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
    // TODO: Add the persmissions for Android
    try {
      const dirs = RNFetchBlob.fs.dirs;
      const dirToSave = isIos ? dirs.DocumentDir : dirs.DownloadDir;
      const configfb = {
        fileCache: true,
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: nftName,
        path: `${dirToSave}/Plug/NFT_${deleteWhiteSpaces(
          nftName,
        )}${getAbsoluteType(type)}`,
      };
      const configOptions = Platform.select({
        ios: {
          fileCache: configfb.fileCache,
          title: configfb.title,
          path: configfb.path,
        },
        android: configfb,
      });

      RNFetchBlob.config(configOptions)
        .fetch('GET', selectedNFT?.url)
        .then(res => {
          if (isIos) {
            RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
            RNFetchBlob.ios.previewDocument(configfb.path);
          }
        });
    } catch (e) {
      console.log(`Error at Download NFT | type: ${type} | error: ${e}`);
    }
  };

  const handleMore = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: t('nftDetail.moreTitle'),
        options: moreOptions,
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark',
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 1:
            Linking.openURL(selectedNFT?.url);
            break;
          case 2:
            handleShare();
            break;
          case 3:
            downloadNFT();
            break;
        }
      },
    );
  };

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
                onPress={handleMore}
              />
            </View>
            <View style={styles.buttonWraperRight}>
              <RainbowButton
                text={t('common.send')}
                onPress={handleSend}
                disabled={isCapCrowns}
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
      <Send
        modalRef={sendRef}
        nft={selectedNFT}
        onSuccess={() => modalRef.current?.close()}
      />
    </>
  );
};

export default NftDetail;
