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

  const renderWhiteList = ({
    item,
    index,
  }: {
    item: WCWhiteListItem;
    index: number;
  }) => {
    const { canisterId, name, icon } = item;
    return (
      <CommonItem
        name={name}
        key={index}
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
      renderItem={renderWhiteList}
      keyExtractor={item => item.canisterId}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContainer}
    />
  );
}

export default RequestConnect;
