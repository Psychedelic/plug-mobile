import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import Touchable from '../../../../../../components/animations/Touchable';
import NftDisplayer from '../../../../../../components/common/NftDisplayer';
import sharedStyles from '../../styles';

function NftItem({ item, onOpen }) {
  const { url, canisterId, index, collection, name } = item;
  const [type, setType] = useState(null);

  useEffect(() => {
    const getType = async () =>
      await fetch(url).then(res => setType(res.headers.get('Content-Type')));
    getType();
    return () => setType(null);
  }, [url]);

  return (
    <View key={`${canisterId}_${index}`} style={sharedStyles.item}>
      <Touchable onPress={onOpen(item)} style={sharedStyles.touchable}>
        {type ? (
          <NftDisplayer
            type={type}
            url={url}
            style={sharedStyles.nftDisplayer}
          />
        ) : (
          <ActivityIndicator style={sharedStyles.activityIndicator} />
        )}
      </Touchable>
      <Text style={sharedStyles.text}>{name || `${collection} #${index}`}</Text>
    </View>
  );
}

export default NftItem;
