import { useScrollToTop } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React, { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, View } from 'react-native';

import useScrollHanlder from '@/components/buttons/ScrollableButton/hooks/useScrollHandler';
import { EmptyState, ErrorState, Text } from '@/components/common';
import { ERROR_TYPES } from '@/constants/general';
import { Colors } from '@/constants/theme';
import { RootScreenProps } from '@/interfaces/navigation';
import { Collection } from '@/interfaces/redux';
import { Container, Separator } from '@/layout';
import Routes from '@/navigation/Routes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getNFTs } from '@/redux/slices/user';
import WalletHeader from '@/screens/tabs/components/WalletHeader';
import { isICNSCanister } from '@/utils/assets';

import NftItem, { ITEM_HEIGHT } from '../components/NftItem';
import AddCollection from './modals/AddCollection';
import styles from './styles';

function NFTs({ navigation }: RootScreenProps<Routes.NFTS>) {
  const { t } = useTranslation();
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

  const handleCollectionPress = (collection: Collection) => {
    if (collection.tokens.length === 1) {
      navigation.navigate(Routes.MODAL_STACK, {
        screen: Routes.NFT_DETAIL,
        params: {
          index: collection.tokens[0].index,
          canisterId: collection.canisterId,
        },
      });
    } else {
      navigation.navigate(Routes.MODAL_STACK, {
        screen: Routes.NFT_LIST,
        params: { canisterId: collection.canisterId },
      });
    }
  };

  const renderCollection = ({ item }: { item: Collection }) => {
    const isICNS = isICNSCanister(item.canisterId);
    return (
      <NftItem
        url={item.icon}
        title={item.name}
        subtitle={t('nftTab.items', { count: item.tokens.length })}
        containerStyle={styles.itemContainer}
        itemStyle={isICNS && styles.icnsImage}
        onPress={() => handleCollectionPress(item)}
        canisterId={item.canisterId}
        itemId={item.name}
      />
    );
  };

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
              data={collections}
              numColumns={2}
              horizontal={false}
              ref={NFTListRef}
              renderItem={renderCollection}
              estimatedItemSize={ITEM_HEIGHT}
              keyExtractor={({ canisterId }) => canisterId}
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
            <AddCollection scrollPosition={scrollPosition} />
          </View>
        ) : (
          <ErrorState onPress={onRefresh} errorType={ERROR_TYPES.FETCH_ERROR} />
        )}
      </Container>
    </>
  );
}

export default NFTs;
