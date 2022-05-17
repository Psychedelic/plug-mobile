import React, { useState } from 'react';
import { Text, View } from 'react-native';

import NftDisplayer from '@/commonComponents/NftDisplayer';
import Touchable from '@/commonComponents/Touchable';
import useGetType from '@/hooks/useGetType';

import styles from './styles';

function NftItem({ item, onOpen, isSend }) {
  const { url, canisterId, index, collection } = item;
  const isDisabled = collection === 'CAP Crowns' && isSend;
  const title = `${collection} #${index}`;
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
      style={[styles.item, isDisabled && styles.disabledContainer]}>
      <Touchable onPress={handleOnPress} style={styles.touchable}>
        <NftDisplayer type={type} url={url} style={styles.nftDisplayer} />
      </Touchable>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
        {title}
      </Text>
    </View>
  );
}

export default NftItem;
