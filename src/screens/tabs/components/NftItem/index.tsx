import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

import { NftDisplayer, Text, Touchable } from '@/components/common';
import useGetType from '@/hooks/useGetType';

import styles, { CONTAINER_HEIGHT } from './styles';

export const ITEM_HEIGHT = CONTAINER_HEIGHT;

interface Props {
  url: string;
  onPress: () => void;
  canisterId: string;
  itemId: string | number;
  titleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  title?: string;
  subtitle?: string;
  ICNSName?: string;
}

function NftItem({
  onPress,
  url,
  title,
  titleStyle,
  subtitle,
  containerStyle,
  itemStyle,
  canisterId,
  itemId,
  ICNSName,
}: Props) {
  const type = useGetType(url);
  return (
    <Touchable style={containerStyle} onPress={onPress}>
      <NftDisplayer
        type={type}
        url={url}
        style={[styles.display, itemStyle]}
        icnsSize="small"
        paused
        canisterId={canisterId}
        itemId={itemId}
        ICNSName={ICNSName}
      />
      {title && (
        <Text
          type="caption"
          style={[styles.title, titleStyle]}
          numberOfLines={1}
          ellipsizeMode="tail">
          {title}
        </Text>
      )}
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

export default NftItem;
