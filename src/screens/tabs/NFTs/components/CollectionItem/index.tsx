import React from 'react';

import { Text, Touchable } from '@/components/common';
import ImageDisplayer from '@/components/common/NftDisplayer/components/ImageDisplayer';
import useGetType from '@/hooks/useGetType';

import styles, { TOTAL_CONTAINER_HEIGHT } from './styles';

export const ITEM_HEIGHT = TOTAL_CONTAINER_HEIGHT;

interface Props {
  url: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
}

function CollectionItem({ onPress, url, title, subtitle }: Props) {
  const type = useGetType(url);
  return (
    <Touchable style={styles.container} onPress={onPress}>
      <ImageDisplayer type={type} url={url} style={styles.logo} />
      <Text
        type="caption"
        style={styles.title}
        numberOfLines={1}
        ellipsizeMode="tail">
        {title}
      </Text>
      {subtitle && (
        <Text
          type="caption"
          style={styles.subtitle}
          numberOfLines={1}
          ellipsizeMode="tail">
          {subtitle}
        </Text>
      )}
    </Touchable>
  );
}

export default CollectionItem;
