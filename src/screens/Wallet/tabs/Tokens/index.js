import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { Colors, FontStyles } from '../../../../constants/theme';
import TokenItem from '../../../../components/tokens/TokenItem';
import Container from '../../../../components/common/Container';
import Divider from '../../../../components/common/Divider';
import WalletHeader from '../../components/WalletHeader';
import useKeyring from '../../../../hooks/useKeyring';

const Tokens = () => {
  const [refreshing, setRefresing] = useState(false);
  const { getAssets, getState } = useKeyring();
  const { assets } = useSelector(state => state.keyring);

  const onRefresh = async () => {
    setRefresing(true);
    await getAssets();
    setRefresing(false);
  };

  useEffect(() => {
    const refresh = async () => {
      setRefresing(true);
      await getAssets();
      setRefresing(false);
    };
    refresh();
  }, []);
  console.log('Token.assets', assets);
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
