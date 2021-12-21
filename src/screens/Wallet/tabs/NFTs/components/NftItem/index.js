import React from 'react';
import { View, Text } from 'react-native';

import Touchable from '../../../../../../components/animations/Touchable';
import NftDisplayer from '../../../../../../components/common/NftDisplayer';
import sharedStyles from '../../styles';

function NftItem({ item, onOpen }) {
  const { url, canisterId, index, collection, name } = item;

  return (
    <View key={`${canisterId}_${index}`} style={sharedStyles.item}>
      <Touchable onPress={onOpen(item)}>
        <NftDisplayer url={url} style={sharedStyles.nftDisplayer} />
      </Touchable>
      <Text style={sharedStyles.text}>{name || `${collection} #${index}`}</Text>
    </View>
  );
}

export default NftItem;
