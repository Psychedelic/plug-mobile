import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { FlatList } from 'react-native';

import { ICNS_CANISTER_ID } from '@/constants/canister';
import { FileTypes } from '@/interfaces/general';
import { ScreenProps } from '@/interfaces/navigation';
import { CollectionToken } from '@/interfaces/redux';
import Routes from '@/navigation/Routes';
import { useAppSelector } from '@/redux/hooks';

import CollectionItem from '../../components/CollectionItem';
import styles from './styles';

function NftList({ route, navigation }: ScreenProps<Routes.NFT_LIST>) {
  const { canisterId } = route.params;
  const { collections } = useAppSelector(state => state.user);
  const collection = collections.find(c => c.canisterId === canisterId);

  const handleItemPress = (item: CollectionToken, type: FileTypes) => {
    navigation.navigate(Routes.NFT_DETAIL, {
      index: item.index,
      canisterId: item.canister,
      type,
    });
  };

  const renderItem = ({ item }: { item: CollectionToken }) => {
    const isICNS = collection?.canisterId === ICNS_CANISTER_ID;
    const title = isICNS
      ? collection?.name
      : `${collection?.name} #${item.index}`;

    return (
      <CollectionItem
        title={title}
        url={item.url}
        onPress={type => handleItemPress(item, type)}
        containerStyle={styles.itemContainer}
        imageStyle={styles.imageStyle}
      />
    );
  };

  return (
    <FlatList
      data={collection?.tokens}
      renderItem={renderItem}
      numColumns={2}
    />
  );
}

export default NftList;
