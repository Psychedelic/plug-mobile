import React, { useState } from 'react';
import { RefreshControl, ScrollView, Text, StyleSheet } from 'react-native';
import { Colors, FontStyles } from '../../../../constants/theme';
import TokenItem from '../../../../components/tokens/TokenItem';
import Container from '../../../../components/common/Container';
import Divider from '../../../../components/common/Divider';
import WalletHeader from '../../components/WalletHeader';
import useTokens from '../../../../hooks/useTokens';
import useKeyring from '../../../../hooks/useKeyring';

const Tokens = () => {
  const [refreshing, setRefresing] = useState(false);
  const { getAssets } = useKeyring();
  const { tokens } = useTokens();

  const onRefresh = () => {
    setRefresing(true);
    getAssets().then(setRefresing(false));
  };

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
        {tokens.map(token => (
          <TokenItem
            key={token.symbol}
            {...token}
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
