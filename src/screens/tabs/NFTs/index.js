import { useScrollToTop } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React, { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, View } from 'react-native';

import EmptyState from '@/commonComponents/EmptyState';
import ErrorState from '@/commonComponents/ErrorState';
import useScrollHanlder from '@/components/buttons/ScrollableButton/hooks/useScrollHandler';
import Text from '@/components/common/Text';
import { ERROR_TYPES } from '@/constants/general';
import { Colors } from '@/constants/theme';
import { useStateWithCallback } from '@/hooks/useStateWithCallback';
import { Container, Separator } from '@/layout';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getNFTs } from '@/redux/slices/user';
import NftItem, { ITEM_HEIGHT } from '@/screens/tabs/components/NftItem';
import WalletHeader from '@/screens/tabs/components/WalletHeader';
import { formatCollections } from '@/utils/assets';

import AddNFT from './components/AddNFT';
import NftDetail from './screens/NftDetail';
import styles from './styles';

function NFTs() {
  const { t } = useTranslation();
  const detailRef = useRef(null);
  const NFTListRef = useRef(null);
  useScrollToTop(NFTListRef);
  const dispatch = useAppDispatch();
  const [selectedNft, setSelectedNft] = useStateWithCallback(null);
  const { collections, collectionsError, collectionsLoading } = useAppSelector(
    state => state.user
  );
  const { handleOnScroll, scrollPosition } = useScrollHanlder();

  const nfts = useMemo(
    () => (collections ? formatCollections(collections) : []),
    [collections]
  );

  const renderNFT = ({ item }) => <NftItem item={item} onOpen={onOpen} />;

  const onOpen = nft => () => {
    setSelectedNft(nft, () => detailRef.current?.open());
  };

  const onRefresh = () => {
    dispatch(getNFTs());
  };

  return (
    <>
      <Container>
        <WalletHeader />
        <Text style={styles.title}>{t('common.collectibles')}</Text>
        <Separator />
        {!collectionsError ? (
          <View style={styles.container}>
            <FlashList
              onScroll={handleOnScroll}
              bounces
              data={nfts}
              numColumns={2}
              horizontal={false}
              ref={NFTListRef}
              renderItem={renderNFT}
              estimatedItemSize={ITEM_HEIGHT}
              keyExtractor={({ index, canister }) => `${index}${canister}`}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.nftsContainer}
              overScrollMode="never"
              refreshing={collectionsLoading}
              refreshControl={
                <RefreshControl
                  refreshing={collectionsLoading}
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
            <AddNFT scrollPosition={scrollPosition} />
          </View>
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
}

export default NFTs;
