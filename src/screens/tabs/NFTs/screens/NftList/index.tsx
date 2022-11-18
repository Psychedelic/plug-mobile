import { FlashList } from '@shopify/flash-list';
import React, { useLayoutEffect } from 'react';

import { ModalScreenProps } from '@/interfaces/navigation';
import { CollectionToken } from '@/interfaces/redux';
import Routes from '@/navigation/Routes';
import { useAppSelector } from '@/redux/hooks';
import NftItem, { ITEM_HEIGHT } from '@/screens/tabs/components/NftItem';
import { isICNSCanister } from '@/utils/assets';

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
    const isICNS = isICNSCanister(collection?.canisterId);
    const title = isICNS ? item?.name : `${collection?.name} #${item.index}`;

    return (
      <NftItem
        title={isICNS ? undefined : title}
        ICNSName={isICNS ? title : undefined}
        url={item.url}
        onPress={() => handleItemPress(item)}
        containerStyle={styles.itemContainer}
        canisterId={item.canister}
        itemId={item.index}
      />
    );
  };

  return (
    <FlashList
      data={collection?.tokens}
      renderItem={renderItem}
      numColumns={2}
      estimatedItemSize={ITEM_HEIGHT}
      bounces={false}
      showsVerticalScrollIndicator={false}
    />
  );
}

export default NftList;
