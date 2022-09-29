import React, { useState } from 'react';
import { View } from 'react-native';

import NftDisplayer from '@/commonComponents/NftDisplayer';
import Text from '@/commonComponents/Text';
import Touchable from '@/commonComponents/Touchable';
import useGetType from '@/hooks/useGetType';

import styles, { ITEM_SIZE } from './styles';
export const ITEM_HEIGHT = ITEM_SIZE;

function NftItem({ item, onOpen }) {
  const { url, canisterId, index, collection, name } = item;
  const isICNS = collection?.includes('ICNS');
  const title = isICNS ? collection : `${collection} #${index}`;
  const [type, setType] = useState(null);

  useGetType(url, setType);

  const handleOnPress = () => {
    onOpen({ ...item, type })();
  };

  return (
    <View key={`${canisterId}_${index}`} style={styles.item}>
      <Touchable onPress={handleOnPress} style={styles.touchable}>
        <NftDisplayer
          ICNSName={isICNS ? name : undefined}
          type={type}
          url={url}
          style={styles.nftDisplayer}
        />
      </Touchable>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
        {title}
      </Text>
    </View>
  );
}

export default NftItem;
