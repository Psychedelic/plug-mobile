import React, { useState } from 'react';
import { RefreshControl, ScrollView, Text, StyleSheet } from 'react-native';
import Icon from '../../../../components/icons';
import { Colors, FontStyles } from '../../../../constants/theme';
import TokenItem from './components/TokenItem';
import Container from '../../../../components/common/Container';
import Divider from '../../../../components/common/Divider';
import Header from '../../../../components/common/Header';
import UserIcon from '../../../../components/common/UserIcon';
import AccountInfo from '../../../../components/common/AccountInfo';

const header = {
  left: <UserIcon size="small" icon="🔥" />,
  center: <AccountInfo />,
  right: <Text>😆</Text>,
};

const TOKENS = [
  {
    symbol: 'ICP',
    name: 'ICP',
    amount: 152.28,
    value: 12183.29,
    icon: <Icon name="dfinity" />,
  },
  {
    symbol: 'XTC',
    name: 'Cycles',
    amount: 102.2913,
    value: 102.3,
    icon: <Icon name="xtc" />,
  },
];

const Tokens = () => {
  const [refreshing, setRefresing] = useState(false);

  const onRefresh = () => {
    setRefresing(true);

    setTimeout(() => setRefresing(false), 1000);
  };

  return (
    <Container>
      <Header {...header} />
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
        {TOKENS.map(token => (
          <TokenItem key={token.symbol} {...token} />
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
