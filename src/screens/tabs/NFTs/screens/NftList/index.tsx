import { FlashList } from '@shopify/flash-list';
import React from 'react';

import { ScreenProps } from '@/interfaces/navigation';
import { CollectionToken } from '@/interfaces/redux';
import Routes from '@/navigation/Routes';
import { useAppSelector } from '@/redux/hooks';
import NftItem from '@/screens/tabs/components/NftItem';

function NftList({ route, navigation }: ScreenProps<Routes.NFT_LIST>) {
  const { canisterId } = route.params;
  const { collections } = useAppSelector(state => state.user);
  const collection = collections.find(c => c.canisterId === canisterId);

  const renderItem = ({ item }: { item: CollectionToken }) => (
    <NftItem item={item} onOpen={() => {}} />
  );

  return (
    <FlashList
      data={collection?.tokens}
      renderItem={renderItem}
      numColumns={2}
      horizontal={false}
      contentContainerStyle={{
        padding: 20,
        backgroundColor: 'red',
      }}
    />
  );
}

export default NftList;
