import { useScrollToTop } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React, { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, View } from 'react-native';

// import { Modalize } from 'react-native-modalize';
import EmptyState from '@/commonComponents/EmptyState';
import ErrorState from '@/commonComponents/ErrorState';
import useScrollHanlder from '@/components/buttons/ScrollableButton/hooks/useScrollHandler';
import Text from '@/components/common/Text';
import { ERROR_TYPES } from '@/constants/general';
import { Colors } from '@/constants/theme';
import { ScreenProps } from '@/interfaces/navigation';
// import { useStateWithCallback } from '@/hooks/useStateWithCallback';
import { Collection } from '@/interfaces/redux';
import { Container, Separator } from '@/layout';
import Routes from '@/navigation/Routes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getNFTs } from '@/redux/slices/user';
import WalletHeader from '@/screens/tabs/components/WalletHeader';

// import { formatCollections } from '@/utils/assets';
import CollectionItem, { ITEM_HEIGHT } from './components/CollectionItem';
import AddCollection from './modals/AddCollection';
// import NftDetail from './screens/NftDetail';
import styles from './styles';

function NFTs({ navigation }: ScreenProps<Routes.NFTS>) {
  const { t } = useTranslation();
  // const detailRef = useRef<Modalize>(null);
  const NFTListRef = useRef(null);
  useScrollToTop(NFTListRef);
  const dispatch = useAppDispatch();
  const { collections, collectionsError, collectionsLoading } = useAppSelector(
    state => state.user
  );
  const { handleOnScroll, scrollPosition } = useScrollHanlder();

  const totalNfts = useMemo(() => {
    return collections.reduce((acc, curr) => acc + curr.tokens.length, 0);
  }, [collections]);

  const renderCollection = ({ item }: { item: Collection }) => (
    <CollectionItem
      url={item.icon}
      title={item.name}
      subtitle={t('nftTab.items', { count: item.tokens.length })}
      onPress={() =>
        navigation.navigate(Routes.SEND_STACK, {
          screen: Routes.NFT_LIST,
          params: { canisterId: item.canisterId },
        })
      }
    />
  );

  const onRefresh = () => {
    dispatch(getNFTs({ refresh: true }));
  };

  return (
    <>
      <Container>
        <WalletHeader />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{t('common.collectibles')}</Text>
          <Text type="caption" style={styles.totalItems}>
            {t('nftTab.items', { count: totalNfts })}
          </Text>
        </View>
        <Separator />
        {!collectionsError ? (
          <View style={styles.container}>
            <FlashList
              onScroll={handleOnScroll}
              bounces={false}
              data={collections}
              numColumns={2}
              horizontal={false}
              ref={NFTListRef}
              renderItem={renderCollection}
              estimatedItemSize={ITEM_HEIGHT}
              keyExtractor={({ canisterId }) => `${canisterId}`}
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
                  description={t('nftTab.emptySubtitle')}
                  style={styles.emptyState}
                />
              }
            />
            <AddCollection scrollPosition={scrollPosition} />
          </View>
        ) : (
          <ErrorState onPress={onRefresh} errorType={ERROR_TYPES.FETCH_ERROR} />
        )}
      </Container>
      {/* <NftDetail
        modalRef={detailRef}
        selectedNFT={selectedNft}
        handleClose={() => setSelectedNft(null)}
      /> */}
    </>
  );
}

export default NFTs;
