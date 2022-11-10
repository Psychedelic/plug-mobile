import { FlashList } from '@shopify/flash-list';
import React, { useLayoutEffect } from 'react';

import { ICNS_CANISTER_ID } from '@/constants/canister';
import { ModalScreenProps } from '@/interfaces/navigation';
import { CollectionToken } from '@/interfaces/redux';
import Routes from '@/navigation/Routes';
import { useAppSelector } from '@/redux/hooks';

import CollectionItem, { ITEM_HEIGHT } from '../../components/CollectionItem';
import styles from './styles';

function NftList({ route, navigation }: ModalScreenProps<Routes.NFT_LIST>) {
  const { canisterId } = route.params;
  const { collections } = useAppSelector(state => state.user);
  const collection = collections.find(c => c.canisterId === canisterId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${collection?.name} (${collection?.tokens.length})`,
    });
  }, [collection]);

  const handleItemPress = (item: CollectionToken) => {
    navigation.navigate(Routes.NFT_DETAIL, {
      index: item.index,
      canisterId: item.canister,
      showBack: true,
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
        onPress={() => handleItemPress(item)}
        containerStyle={styles.itemContainer}
        itemStyle={styles.itemStyle}
      />
    );
  };

  return (
    <FlashList
      data={collection?.tokens}
      renderItem={renderItem}
      numColumns={2}
      estimatedItemSize={ITEM_HEIGHT}
    />
  );
}

export default NftList;
