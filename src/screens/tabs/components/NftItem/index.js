import React from 'react';
import { View } from 'react-native';

import NftDisplayer from '@/commonComponents/NftDisplayer';
import Text from '@/commonComponents/Text';
import Touchable from '@/commonComponents/Touchable';
import { ICNS_CANISTER_ID } from '@/constants/canister';
import useGetType from '@/hooks/useGetType';

import styles, { ITEM_SIZE } from './styles';
export const ITEM_HEIGHT = ITEM_SIZE;

function NftItem({ item, onOpen }) {
  const { url, canister, index, name, collectionName } = item;
  const isICNS = canister === ICNS_CANISTER_ID;
  const title = isICNS ? collectionName : `${collectionName} #${index}`;
  const type = useGetType(url);

  const handleOnPress = () => {
    onOpen?.({ ...item, type })?.();
  };

  return (
    <View key={`${canister}_${index}`} style={styles.item}>
      <Touchable onPress={handleOnPress} style={styles.touchable}>
        <NftDisplayer
          ICNSName={isICNS ? name : undefined}
          icnsSize="small"
          type={type}
          url={url}
          style={styles.nftDisplayer}
          canisterId={canister}
          itemId={index}
        />
      </Touchable>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
        {title}
      </Text>
    </View>
  );
}

export default NftItem;
