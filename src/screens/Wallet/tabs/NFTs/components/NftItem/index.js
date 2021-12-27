import React, { useState } from 'react';
import { View, Text } from 'react-native';

import Touchable from '../../../../../../components/animations/Touchable';
import NftDisplayer from '../../../../../../components/common/NftDisplayer';
import useGetType from '../../../../../../hooks/useGetType';
import sharedStyles from '../../styles';

function NftItem({ item, onOpen }) {
  const { url, canisterId, index, collection, name } = item;
  const [type, setType] = useState(null);

  useGetType(url, setType);

  return (
    <View key={`${canisterId}_${index}`} style={sharedStyles.item}>
      <Touchable onPress={onOpen(item)} style={sharedStyles.touchable}>
        <NftDisplayer type={type} url={url} style={sharedStyles.nftDisplayer} />
      </Touchable>
      <Text numberOfLines={1} ellipsizeMode="tail" style={sharedStyles.text}>
        {name || `${collection} #${index}`}
      </Text>
    </View>
  );
}

export default NftItem;
