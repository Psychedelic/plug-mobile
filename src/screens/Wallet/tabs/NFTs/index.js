import React, { useState, useRef } from 'react';
import { RefreshControl, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

<<<<<<< HEAD
import { getNFTs, setSelectedNFT } from '../../../../redux/slices/keyring';
import EmptyState from '../../../../components/common/EmptyState';
=======
import { getNFTs } from '../../../../redux/slices/keyring';
>>>>>>> 3632d74 (Fix chaging size at nft display)
import Container from '../../../../components/common/Container';
import Divider from '../../../../components/common/Divider';
import { ScrollView } from 'react-native-gesture-handler';
import WalletHeader from '../../components/WalletHeader';
import { Colors } from '../../../../constants/theme';
import NftItem from './components/NftItem/index';
import NftDetail from '../../../NftDetail';
import styles from './styles';

const NFTs = () => {
  const detailRef = useRef(null);
  const dispatch = useDispatch();
  const [refreshing, setRefresing] = useState(false);
  const [selectedNft, setSelectedNft] = useState(null);
  const { collections } = useSelector(state => state.keyring);

  const renderNFT = (item, index) => (
    <NftItem key={index} item={item} onOpen={onOpen} />
  );

  const onOpen = nft => () => {
    setSelectedNft(nft);
    detailRef?.current.open();
  };

  const onRefresh = () => {
    setRefresing(true);
    dispatch(getNFTs());
    setTimeout(() => setRefresing(false), 1000);
  };

  const nfts =
    collections?.flatMap(collection => collection?.tokens || []) || [];

  return (
    <>
      <Container>
        <WalletHeader />
        <Text style={styles.title}>NFTs</Text>
        <Divider />
        <ScrollView
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
