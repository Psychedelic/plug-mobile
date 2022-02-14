import React, { useState, useRef } from 'react';
import { RefreshControl, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

import EmptyState from '../../../../components/common/EmptyState';
import Container from '../../../../components/common/Container';
import Divider from '../../../../components/common/Divider';
import { getNFTs } from '../../../../redux/slices/user';
import { Colors } from '../../../../constants/theme';
import NftItem from './components/NftItem/index';
import NftDetail from '../../../NftDetail';
import styles from './styles';

const NFTs = () => {
  const detailRef = useRef(null);
  const dispatch = useDispatch();
  const [refreshing, setRefresing] = useState(false);
  const [selectedNft, setSelectedNft] = useState(null);
  const { collections } = useSelector(state => state.user);

  const renderNFT = (item, index) => (
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
      <Container
        outerContainerStyle={{
          marginTop: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}>
        <Text style={styles.title}>NFTs</Text>
        <Divider />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.White.Primary}
            />
          }>
          {nfts?.length > 0 ? (
            nfts.map(renderNFT)
          ) : (
            <EmptyState
              style={styles.emptyState}
              title="You don't own any NFTs yet"
              text="When you do, they'll show here, where you will see their traits and send them."
            />
          )}
        </ScrollView>
      </Container>
      <NftDetail modalRef={detailRef} selectedNFT={selectedNft} />
    </>
  );
};

export default NFTs;
