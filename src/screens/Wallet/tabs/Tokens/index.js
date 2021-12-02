import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Colors, FontStyles } from '../../../../constants/theme';
import TokenItem from '../../../../components/tokens/TokenItem';
import Container from '../../../../components/common/Container';
import Divider from '../../../../components/common/Divider';
import WalletHeader from '../../components/WalletHeader';
import { getAssets, setAssetsLoading } from '../../../../redux/slices/keyring';

const Tokens = () => {
  const { assets, assetsLoading } = useSelector(state => state.keyring);
  const [refreshing, setRefresing] = useState(assetsLoading);
  const dispatch = useDispatch();

  const onRefresh = () => {
    setRefresing(true);
    dispatch(setAssetsLoading(true));
    dispatch(getAssets(true));
  };

  useEffect(() => {
    dispatch(setAssetsLoading(true));
    dispatch(getAssets(true));
  }, []);

  useEffect(() => {
    setRefresing(assetsLoading);
  }, [assetsLoading]);

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
