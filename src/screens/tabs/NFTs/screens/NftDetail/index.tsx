import { NFTDetails } from '@psychedelic/dab-js';
import { StackHeaderProps } from '@react-navigation/stack';
import { t } from 'i18next';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Linking, Platform, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';

import Button from '@/components/buttons/Button';
import RainbowButton from '@/components/buttons/RainbowButton';
import { ActionSheet, Badge, NftDisplayer, Text } from '@/components/common';
import ModalHeader from '@/components/navigation/ModalHeader';
import { FontStyles } from '@/constants/theme';
import { ICNS_URL } from '@/constants/urls';
import useGetType from '@/hooks/useGetType';
import DownloadIcon from '@/icons/material/Download.svg';
import ViewIcon from '@/icons/material/View.svg';
import { ModalScreenProps } from '@/interfaces/navigation';
import Routes from '@/navigation/Routes';
import { useAppSelector } from '@/redux/hooks';
import { getNFTDetails } from '@/services/DAB';
import { isICNSCanister } from '@/utils/assets';
import { downloadFile } from '@/utils/filesystem';
import { deleteWhiteSpaces } from '@/utils/strings';

import Section from './components/Section';
import styles from './styles';

const header = (props: StackHeaderProps, showBack?: boolean) => (
  <ModalHeader {...props} showBack={showBack} />
);

function NftDetail({ route, navigation }: ModalScreenProps<Routes.NFT_DETAIL>) {
  const { canisterId, index, showBack } = route.params;
  const { collections } = useAppSelector(state => state.user);
  const collection = collections.find(c => c.canisterId === canisterId);
  const selectedNFT = collection?.tokens?.find(token => token.index === index);
  const isICNS = isICNSCanister(selectedNFT?.canister);
  const nftName = `${collection?.name || ''} #${index}`;
  const type = useGetType(selectedNFT?.url);

  const actionSheetRef = useRef<Modalize>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [nftDetails, setNFTDetails] = useState<NFTDetails<string | bigint>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isICNS ? selectedNFT?.name : `#${selectedNFT?.index}`,
      header: (props: StackHeaderProps) => header(props, showBack),
    });
  }, [selectedNFT]);

  useEffect(() => {
    if (selectedNFT && !isICNS) {
      getNFTDetails({
        index,
        canister: selectedNFT.canister,
        standard: selectedNFT.standard,
      })
        .then(details => setNFTDetails(details))
        .catch(() => {});
    }
    return () => setNFTDetails(undefined);
  }, [selectedNFT]);

  const handleMore = () => {
    if (isICNS) {
      const name = selectedNFT?.name?.split('.')[0];
      Linking.openURL(`${ICNS_URL}/domains/${name}/detail`);
    } else {
      actionSheetRef.current?.open();
    }
  };

  const handleSend = () => {
    navigation.navigate(Routes.SEND, { nft: selectedNFT });
  };

  const downloadNFT = () => {
    // TODO: Handle download error and permissons error
    if (type && selectedNFT?.url) {
      setIsDownloading(true);
      downloadFile({
        filename: `NFT_${deleteWhiteSpaces(nftName)}`,
        mimeType: type,
        url: selectedNFT?.url,
        onFetched: () => setIsDownloading(false),
      });
    }
  };

  const moreOptions = {
    title: t('nftDetail.moreTitle'),
    options: [
      {
        id: 1,
        label: t('nftDetail.moreOptions.view'),
        onPress: () => Linking.openURL(selectedNFT?.url!),
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
      <ScrollView
        style={styles.content}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.nftDisplayerContainer}>
          {selectedNFT && (
            <NftDisplayer
              ICNSName={isICNS ? selectedNFT.name : undefined}
              icnsSize="big"
              url={selectedNFT?.url}
              type={type}
              style={styles.video}
              canisterId={selectedNFT.canister}
              itemId={selectedNFT.index}
            />
          )}
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWraperLeft}>
            <Button
              text={isICNS ? t('nftDetail.manage') : t('common.more')}
              onPress={handleMore}
              loading={isDownloading}
              disabled={!type}
            />
          </View>
          <View style={styles.buttonWraperRight}>
            <RainbowButton
              text={t('common.send')}
              onPress={handleSend}
              disabled={isDownloading || isICNS}
            />
          </View>
        </View>
        {collection && selectedNFT && (
          <Section
            title={t('nftDetail.collectionTitle')}
            style={styles.collectionSection}>
            <Badge value={collection?.name} icon={collection?.icon} />
            <Badge value={isICNS ? selectedNFT.name || '' : `#${index}`} />
          </Section>
        )}
        {!!collection?.description && (
          <Section title={t('nftDetail.descriptionTitle')}>
            <Text style={FontStyles.NormalGray}>{collection.description}</Text>
          </Section>
        )}
        {!!nftDetails?.metadata?.properties?.length && (
          <Section title={t('nftDetail.attributesTitle')}>
            {nftDetails.metadata.properties.map((prop: any) => (
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
