import { useScrollToTop } from '@react-navigation/native';
import React, { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import EmptyState from '@/commonComponents/EmptyState';
import ErrorState from '@/commonComponents/ErrorState';
import Text from '@/components/common/Text';
import { ERROR_TYPES } from '@/constants/general';
import { Colors } from '@/constants/theme';
import { useStateWithCallback } from '@/hooks/useStateWithCallback';
import { Container, Separator } from '@/layout';
import { getNFTs } from '@/redux/slices/user';
import NftItem from '@/screens/tabs/components/NftItem';
import WalletHeader from '@/screens/tabs/components/WalletHeader';

import NftDetail from './screens/NftDetail';
import styles from './styles';

const NFTs = () => {
  const { t } = useTranslation();
  const detailRef = useRef(null);
  const NFTListRef = useRef(null);
  useScrollToTop(NFTListRef);
  const dispatch = useDispatch();
  const [refreshing, setRefresing] = useState(false);
  const [selectedNft, setSelectedNft] = useStateWithCallback(null);
  const { collections, collectionsError } = useSelector(state => state.user);

  const nfts = useMemo(
    () => collections?.flatMap(collection => collection?.tokens || []) || [],
    [collections]
  );

  const renderNFT = ({ item }) => (
    <NftItem
      key={`${item.canisterId}_${item.index}`}
      item={item}
      onOpen={onOpen}
    />
  );

  const onOpen = nft => () => {
    setSelectedNft(nft, () => detailRef.current?.open());
  };

  const onRefresh = () => {
    setRefresing(true);
    dispatch(getNFTs())
      .unwrap()
      .then(() => {
        setRefresing(false);
      });
  };

  return (
    <>
      <Container>
        <WalletHeader />
        <Text style={styles.title}>{t('common.collectibles')}</Text>
        <Separator />
        {!collectionsError ? (
          <FlatList
            bounces
            data={nfts}
            numColumns={2}
            ref={NFTListRef}
            renderItem={renderNFT}
            style={styles.container}
            keyExtractor={({ index, canister }) => `${index}${canister}`}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.nftsContainer}
            overScrollMode="never"
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={Colors.White.Primary}
              />
            }
            ListEmptyComponent={
              <EmptyState
                title={t('nftTab.emptyTitle')}
                text={t('nftTab.emptySubtitle')}
                style={styles.emptyState}
              />
            }
          />
        ) : (
          <ErrorState onPress={onRefresh} errorType={ERROR_TYPES.FETCH_ERROR} />
        )}
      </Container>
      <NftDetail
        modalRef={detailRef}
        selectedNFT={selectedNft}
        handleClose={() => setSelectedNft(null)}
      />
    </>
  );
};

export default NFTs;
