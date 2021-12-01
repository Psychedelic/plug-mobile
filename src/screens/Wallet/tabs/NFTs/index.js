import React, { useState, useRef } from 'react';
import {
  View,
  RefreshControl,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import { FontStyles, Colors } from '../../../../constants/theme';
import Container from '../../../../components/common/Container';
import Divider from '../../../../components/common/Divider';
import { ScrollView } from 'react-native-gesture-handler';
import WalletHeader from '../../components/WalletHeader';
import NftDetail from '../../../NftDetail';
import Touchable from '../../../../components/animations/Touchable';
import useNfts from '../../../../hooks/useNfts';
import NftDisplayer from '../../../../components/common/NftDisplayer';
import { getNFTs, setSelectedNFT } from '../../../../redux/slices/keyring';
import { useDispatch, useSelector } from 'react-redux';

const { width } = Dimensions.get('window');
const itemSize = width / 2 - 40;

const NFTs = () => {
  const [refreshing, setRefresing] = useState(false);

  const { collections } = useSelector(state => state.keyring);
  const dispatch = useDispatch();

  const detailRef = useRef(null);

  const onOpen = nft => () => {
    dispatch(setSelectedNFT(nft));
    detailRef?.current.open();
  };

  const onRefresh = () => {
    setRefresing(true);
    dispatch(getNFTs());
    setTimeout(() => setRefresing(false), 1000);
  };
  const nfts =
    collections?.flatMap(collection => collection?.tokens || []) || [];
  console.log('Component nfts', nfts);
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
          {nfts.map(item => (
            <View key={`${item.canisterId}_${item.index}`} style={styles.item}>
              <Touchable onPress={onOpen(item)}>
                <NftDisplayer
                  url={item.url}
                  style={{ width: itemSize, height: itemSize }}
                />
              </Touchable>
              <Text style={styles.text}>
                {item.name || `${item.collection} #${item.index}`}
              </Text>
            </View>
          ))}
        </ScrollView>
      </Container>
      <NftDetail modalRef={detailRef} />
    </>
  );
};

export default NFTs;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: width,
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  item: {
    margin: 10,
  },
  text: {
    ...FontStyles.SmallGray,
    marginTop: 10,
  },
  title: {
    paddingLeft: 20,
    paddingBottom: 20,
    ...FontStyles.Title,
  },
});
