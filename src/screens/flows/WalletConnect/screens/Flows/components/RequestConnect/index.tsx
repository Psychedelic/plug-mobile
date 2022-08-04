import React from 'react';
import { FlatList, Linking } from 'react-native';

import CommonItem from '@/commonComponents/CommonItem';
import {
  WallectConnectFlowsData,
  WCWhiteListItem,
} from '@/interfaces/walletConnect';

import styles from './styles';

function RequestConnect({ args }: WallectConnectFlowsData) {
  const { whitelist } = args;
  const whiteListArray = Object.keys(whitelist).map(
    (key: string) => whitelist[key]
  ) as WCWhiteListItem[];

  const renderWhiteList = ({ item }: { item: WCWhiteListItem }) => {
    const { canisterId, name, icon } = item;
    return (
      <CommonItem
        name={name}
        imageUri={icon}
        id={canisterId}
        onPress={() =>
          Linking.openURL(`https://icscan.io/canister/${canisterId}`)
        }
        style={styles.cannisterItem}
        actionIconName="redirectArrow"
      />
    );
  };

  return (
    <FlatList<WCWhiteListItem>
      bounces={false}
      data={whiteListArray}
      style={styles.container}
      renderItem={renderWhiteList}
      keyExtractor={item => item.canisterId}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContainer}
    />
  );
}

export default RequestConnect;
