import { t } from 'i18next';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Linking, Platform, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Button from '@/components/buttons/Button';
import RainbowButton from '@/components/buttons/RainbowButton';
import { ActionSheet, Badge, NftDisplayer, Text } from '@/components/common';
import { ICNS_CANISTER_ID } from '@/constants/canister';
import { FontStyles } from '@/constants/theme';
import useGetType from '@/hooks/useGetType';
import DownloadIcon from '@/icons/material/Download.svg';
import ViewIcon from '@/icons/material/View.svg';
import Routes from '@/navigation/Routes';
import { useAppSelector } from '@/redux/hooks';
import { getNFTDetails } from '@/services/DAB';
import { downloadFile } from '@/utils/filesystem';
import { deleteWhiteSpaces } from '@/utils/strings';

import Section from './components/Section';
import styles from './styles';

function NftDetail({ route, navigation }) {
  const { canisterId, index } = route.params;
  const { collections } = useAppSelector(state => state.user);
  const collection = collections.find(c => c.canisterId === canisterId);
  const selectedNFT = collection.tokens.find(token => token.index === index);
  const { url, canister, standard, name, icon } = selectedNFT || {};
  const isICNS = canister === ICNS_CANISTER_ID;
  const nftName = `${collection.name} #${index}`;
  const type = useGetType(url);

  const actionSheetRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [nftDetails, setNFTDetails] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: nftName,
    });
  }, [nftName]);

  useEffect(() => {
    if (selectedNFT && !isICNS) {
      getNFTDetails({ index, canister, standard })
        .then(details => setNFTDetails(details))
        .catch(() => {});
    }
    return () => setNFTDetails(null);
  }, [selectedNFT]);

  const handleSend = () => {
    navigation.navigate(Routes.SEND, { nft: selectedNFT });
  };

  const downloadNFT = () => {
    // TODO: Handle download error and permissons error
    setIsDownloading(true);
    downloadFile({
      filename: `NFT_${deleteWhiteSpaces(nftName)}`,
      mimeType: type,
      url: selectedNFT?.url,
      onFetched: () => setIsDownloading(false),
    });
  };

  const moreOptions = {
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
  };

  return (
    <>
      <ScrollView style={styles.content}>
        <View style={styles.nftDisplayerContainer}>
          <NftDisplayer
            ICNSName={isICNS ? name : undefined}
            icnsSize="big"
            url={url}
            type={type}
            style={styles.video}
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWraperLeft}>
            <Button
              text={t('common.more')}
              onPress={actionSheetRef.current?.open}
              loading={isDownloading}
              disabled={!type}
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
          <Badge value={collection.name} icon={icon} />
          <Badge value={isICNS ? name : `#${index}`} />
        </Section>
        {!!collection.description && (
          <Section title={t('nftDetail.descriptionTitle')}>
            <Text style={FontStyles.NormalGray}>{collection.description}</Text>
          </Section>
        )}
        {!!nftDetails?.metadata?.properties?.length && (
          <Section title={t('nftDetail.attributesTitle')}>
            {nftDetails.metadata.properties.map(prop => (
              <Badge key={prop.name} name={prop.name} value={prop.value} />
            ))}
          </Section>
        )}
      </ScrollView>
      <ActionSheet
        modalRef={actionSheetRef}
        options={moreOptions.options}
        title={moreOptions.title}
      />
    </>
  );
}

export default NftDetail;
