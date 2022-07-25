import React from 'react';
import { FlatList, Linking, ScrollView } from 'react-native';

import CommonItem from '@/commonComponents/CommonItem';

import styles from './styles';

function RequestConnect({ args }) {
  const { whitelist } = args;
  const whiteListArray = Object.entries(whitelist);

  const renderWhiteList = ({ item }, index) => {
    const [cannisterId, { name, icon }] = item;
    return (
      <CommonItem
        name={name}
        key={index}
        imageUri={icon}
        id={cannisterId}
        onPress={() =>
          Linking.openURL(`https://icscan.io/canister/${cannisterId}`)
        }
        style={styles.cannisterItem}
        actionIconName="redirectArrow"
      />
    );
  };

  return (
    <FlatList
      bounces={false}
      data={whiteListArray}
      renderItem={renderWhiteList}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContainer}
    />
  );
}

export default RequestConnect;
