import { t } from 'i18next';
import React from 'react';

import { Text, Touchable } from '@/components/common';
import ImageDisplayer from '@/components/common/NftDisplayer/components/ImageDisplayer';
import useGetType from '@/hooks/useGetType';
import { Collection } from '@/interfaces/redux';

import styles, { TOTAL_CONTAINER_HEIGHT } from './styles';

export const ITEM_HEIGHT = TOTAL_CONTAINER_HEIGHT;

interface Props {
  collection: Collection;
}

function CollectionItem({ collection }: Props) {
  const type = useGetType(collection.icon);
  return (
    <Touchable style={styles.container}>
      <ImageDisplayer type={type} url={collection.icon} style={styles.logo} />
      <Text type="caption" style={styles.name}>
        {collection.name}
      </Text>
      <Text type="caption" style={styles.size}>
        {t('nftTab.items', { count: collection.tokens.length })}
      </Text>
    </Touchable>
  );
}

export default CollectionItem;
