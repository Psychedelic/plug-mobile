import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import Container from '../components/Container';
import BottomNavigator from '../components/BottomNavigator';
import { Icon } from '../components/icons';
import Tokens from './Tokens';
import NFTs from './NFTs';
import Divider from '../components/Divider';
import Header from '../components/Header';
import { FontStyles } from '../constants/theme';
import AccountInfo from '../components/AccountInfo';

const TABS = selected => [
  {
    icon: <Icon name="tokens" color={selected === 0 ? 'white' : 'gray'} />,
    name: 'Tokens',
  },
  {
    icon: <Icon name="nfts" color={selected === 1 ? 'white' : 'gray'} />,
    name: 'NFTs',
  },
];

const header = {
  left: <Text>🔥</Text>,
  center: <AccountInfo />,
  right: <Text>😀😁😆</Text>,
};

function Wallet() {
  const [selectedTab, setSelectedTab] = useState(0);

  const onSelect = value => setSelectedTab(value);

  const tabs = TABS(selectedTab);

  return (
    <Container>
      <Header {...header} />
      <Text style={styles.title}>{tabs[selectedTab].name}</Text>
      <Divider />
      {
        // maybe add transition animation between tabs
        selectedTab === 0 && <Tokens />
      }
      {selectedTab === 1 && <NFTs />}

      <BottomNavigator tabs={tabs} selected={selectedTab} onSelect={onSelect} />
    </Container>
  );
}

export default Wallet;

const styles = StyleSheet.create({
  title: {
    paddingLeft: 20,
    paddingBottom: 20,
    ...FontStyles.Title,
  },
});