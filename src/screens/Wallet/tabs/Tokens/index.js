import { RefreshControl, ScrollView, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Colors, FontStyles } from '../../../../constants/theme';
import TokenItem from '../../../../components/tokens/TokenItem';
import Container from '../../../../components/common/Container';
import Divider from '../../../../components/common/Divider';
import { useICPPrice } from '../../../../redux/slices/icp';
import Row from '../../../../components/layout/Row';
import Send from '../../../../screens/Send';
import {
  getAssets,
  getTransactions,
  setAssetsLoading,
} from '../../../../redux/slices/user';

function Tokens() {
  const { assets, assetsLoading } = useSelector(state => state.user);
  const [refreshing, setRefresing] = useState(assetsLoading);
  const usdSum = Number(
    assets.reduce((total, token) => total + Number(token?.value), 0),
  ).toFixed(2);
  const dispatch = useDispatch();
  const icpPrice = useICPPrice();
  const sendRef = useRef(null);

  const onRefresh = () => {
    setRefresing(true);
    dispatch(setAssetsLoading(true));
    dispatch(getAssets({ refresh: true, icpPrice }));
  };

  const openSend = () => {
    sendRef.current?.open();
  };

  useEffect(() => {
    setRefresing(assetsLoading);
  }, [assetsLoading]);

  useEffect(() => {
    dispatch(setAssetsLoading(true));
    dispatch(getAssets({ refresh: true, icpPrice }));
    dispatch(getTransactions({ icpPrice }));
  }, []);

  return (
    <Container
      outerContainerStyle={{
        marginTop: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      }}>
      <Row style={styles.rowStyle}>
        <Text style={styles.title}>Tokens</Text>
        <Text style={styles.title}>{`$${usdSum}`}</Text>
      </Row>
      <Divider />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.White.Primary}
          />
        }>
        {assets?.map(token => (
          <TokenItem
            key={token.symbol}
            {...token}
            color={Colors.Gray.Tertiary}
            onPress={openSend}
            style={styles.tokenItem}
          />
        ))}
      </ScrollView>
      <Send modalRef={sendRef} />
    </Container>
  );
}

export default Tokens;

const styles = StyleSheet.create({
  title: {
    paddingLeft: 20,
    paddingBottom: 20,
    ...FontStyles.Title,
  },
  tokenItem: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  rowStyle: {
    justifyContent: 'space-between',
    paddingRight: 20,
  },
});
