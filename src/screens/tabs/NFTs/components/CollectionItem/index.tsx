import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

import { NftDisplayer, Text, Touchable } from '@/components/common';
import useGetType from '@/hooks/useGetType';

import styles, { CONTAINER_HEIGHT } from './styles';

export const ITEM_HEIGHT = CONTAINER_HEIGHT;

interface Props {
  url: string;
  onPress: () => void;
  titleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ViewStyle>;
  title?: string;
  subtitle?: string;
}

function CollectionItem({
  onPress,
  url,
  title,
  titleStyle,
  subtitle,
  containerStyle,
  imageStyle,
}: Props) {
  const type = useGetType(url);
  return (
    <Touchable style={containerStyle} onPress={onPress}>
      <NftDisplayer
        type={type}
        url={url}
        style={[styles.image, imageStyle]}
        icnsSize="small"
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

export default CollectionItem;