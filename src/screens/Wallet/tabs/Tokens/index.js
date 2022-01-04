import { RefreshControl, ScrollView, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

import { Colors, FontStyles } from '../../../../constants/theme';
import TokenItem from '../../../../components/tokens/TokenItem';
import Container from '../../../../components/common/Container';
import Divider from '../../../../components/common/Divider';
import WalletHeader from '../../components/WalletHeader';
import {
  getAssets,
  getTransactions,
  setAssetsLoading,
} from '../../../../redux/slices/keyring';
import { useICPPrice } from '../../../../redux/slices/icp';

const Tokens = () => {
  const { assets, assetsLoading } = useSelector(state => state.keyring);
  const [refreshing, setRefresing] = useState(assetsLoading);
  const dispatch = useDispatch();
  const icpPrice = useICPPrice();

  const onRefresh = () => {
    setRefresing(true);
    dispatch(setAssetsLoading(true));
    dispatch(getAssets({ refresh: true, icpPrice }));
  };

  useEffect(() => {
    setRefresing(assetsLoading);
  }, [assetsLoading]);

  useEffect(() => {
    getTransactions({ icpPrice });
  }, []);

  return (
    <Container>
      <WalletHeader />
      <Text style={styles.title}>Tokens</Text>
      <Divider />
      <ScrollView
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
            style={{ marginTop: 20, paddingHorizontal: 20 }}
          />
        ))}
      </ScrollView>
    </Container>
  );
};

export default Tokens;

const styles = StyleSheet.create({
  title: {
    paddingLeft: 20,
    paddingBottom: 20,
    ...FontStyles.Title,
  },
});
