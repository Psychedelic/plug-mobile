import { RefreshControl, Text, FlatList } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ERROR_TYPES } from '../../../../components/common/ErrorState/constants';
import ErrorState from '../../../../components/common/ErrorState';
import EmptyState from '../../../../components/common/EmptyState';
import Container from '../../../../components/common/Container';
import Divider from '../../../../components/common/Divider';
import WalletHeader from '../../components/WalletHeader';
import { getNFTs } from '../../../../redux/slices/user';
import { Colors } from '../../../../constants/theme';
import NftItem from './components/NftItem/index';
import NftDetail from '../../../NftDetail';
import styles from './styles';

const NFTs = () => {
  const detailRef = useRef(null);
  const NFTListRef = useRef(null);
  const dispatch = useDispatch();
  const [refreshing, setRefresing] = useState(false);
  const [selectedNft, setSelectedNft] = useState(null);
  const { collections, collectionsError, scrollOnNFTs } = useSelector(
    state => state.user,
  );

  useEffect(() => {
    if (scrollOnNFTs) {
      NFTListRef?.current?.scrollToIndex({ index: 0 });
    }
  }, [scrollOnNFTs]);

  const renderNFT = ({ item }, index) => (
    <NftItem key={index} item={item} onOpen={onOpen} />
  );

  const onOpen = nft => () => {
    setSelectedNft(nft);
    detailRef?.current.open();
  };

  const onRefresh = () => {
    setRefresing(true);
    dispatch(getNFTs())
      .unwrap()
      .then(() => {
        setRefresing(false);
      });
  };

  const nfts =
    collections?.flatMap(collection => collection?.tokens || []) || [];

  return (
    <>
      <Container>
        <WalletHeader />
        <Text style={styles.title}>Collectibles</Text>
        <Divider />
        {!collectionsError ? (
          <FlatList
            bounces
            data={nfts}
            numColumns={2}
            ref={NFTListRef}
            renderItem={renderNFT}
            style={styles.container}
            keyExtractor={(_, index) => index}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.nftsContainer}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={Colors.White.Primary}
              />
            }
            ListEmptyComponent={
              <EmptyState
                title="You don't own any Collectibles yet"
                text="When you do, they'll show here, where you will see their traits and send them."
              />
            }
          />
        ) : (
          <ErrorState onPress={onRefresh} errorType={ERROR_TYPES.FETCH_ERROR} />
        )}
      </Container>
      <NftDetail modalRef={detailRef} selectedNFT={selectedNft} />
    </>
  );
};

export default NFTs;
