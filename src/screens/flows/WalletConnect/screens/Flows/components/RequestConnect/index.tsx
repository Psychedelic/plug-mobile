import React from 'react';
import { FlatList, Linking } from 'react-native';

import CommonItem from '@/commonComponents/CommonItem';
import { icScanUrl } from '@/constants/urls';
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

    const handlePress = () => {
      Linking.openURL(`${icScanUrl}${canisterId}`);
    };

    return (
      <CommonItem
        longId
        name={name}
        id={canisterId}
        onPress={handlePress}
        onActionPress={handlePress}
        style={styles.cannisterItem}
        actionIconName="redirectArrow"
        imageUri={icon}
        image="unknown"
      />
    );
  };

  return (
    <FlatList<WCWhiteListItem>
      bounces={false}
      overScrollMode="never"
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
