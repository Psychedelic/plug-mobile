import React, { useState } from 'react';
import { View, Text } from 'react-native';

import NftDisplayer from '../../../../../../components/common/NftDisplayer';
import Touchable from '../../../../../../components/animations/Touchable';
import useGetType from '../../../../../../hooks/useGetType';
import sharedStyles from '../../styles';

function NftItem({ item, onOpen, isSend }) {
  const { url, canisterId, index, collection } = item;
  const isDisabled = collection === 'CAP Crowns' && isSend;
  const [type, setType] = useState(null);

  useGetType(url, setType);

  const handleOnPress = () => {
    if (!isDisabled) {
      onOpen(item)();
    }
  };

  return (
    <View
      key={`${canisterId}_${index}`}
      style={[sharedStyles.item, isDisabled && sharedStyles.disabledContainer]}>
      <Touchable onPress={handleOnPress} style={sharedStyles.touchable}>
        <NftDisplayer type={type} url={url} style={sharedStyles.nftDisplayer} />
      </Touchable>
      <Text numberOfLines={1} ellipsizeMode="tail" style={sharedStyles.text}>
        {`${collection} #${index}`}
      </Text>
    </View>
  );
}

export default NftItem;
