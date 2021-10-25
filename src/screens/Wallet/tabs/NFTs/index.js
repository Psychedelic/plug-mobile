import React, { useState, useRef } from 'react';
import {
  View,
  RefreshControl,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import { FontStyles, Colors } from '../../../../constants/theme';
import Container from '../../../../components/common/Container';
import Divider from '../../../../components/common/Divider';
import { ScrollView } from 'react-native-gesture-handler';
import WalletHeader from '../../components/WalletHeader';
import NftDetail from '../../../NftDetail';
import Touchable from '../../../../components/animations/Touchable';

const { width } = Dimensions.get('window');
const itemSize = width / 2 - 30;

const NFTs = () => {
  const [refreshing, setRefresing] = useState(false);

  const detailRef = useRef(null);

  const onOpen = () => {
    detailRef?.current.open();
  }

  const onRefresh = () => {
    setRefresing(true);

    setTimeout(() => setRefresing(false), 1000);
  };

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
          {[0, 1, 2, 3, 4, 5, 6, 7].map(item => (
            <View key={item} style={styles.item}>
              <Touchable onPress={onOpen}>
                <View style={styles.image} />
              </Touchable>
              <Text style={styles.text}>Test {item}</Text>
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
  image: {
    width: itemSize,
    height: itemSize,
    backgroundColor: 'black',
    borderRadius: 20,
  },
  text: {
    ...FontStyles.NormalGray,
    marginTop: 10,
  },
  title: {
    paddingLeft: 20,
    paddingBottom: 20,
    ...FontStyles.Title,
  },
});
