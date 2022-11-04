import React from 'react';
import { View } from 'react-native';

import ImageDisplayer from '@/components/common/NftDisplayer/components/ImageDisplayer';
import Text from '@/components/common/Text';
import { FontStyles } from '@/constants/theme';
import useGetType from '@/hooks/useGetType';

import styles from './styles';

export interface Props {
  title: string;
  subtitle: string;
  iconUrl: string;
}

function ActionItem({ title, subtitle, iconUrl }: Props) {
  const imageType = useGetType(iconUrl);

  return (
    <View style={styles.itemDataContainer}>
      <View>
        <Text type="subtitle2" style={styles.title}>
          {title}
        </Text>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={[FontStyles.Small, styles.itemSubtitle]}>
          {subtitle}
        </Text>
      </View>
      <View style={styles.appIconContainer}>
        <ImageDisplayer url={iconUrl} type={imageType} style={styles.appIcon} />
      </View>
    </View>
  );
}

export default ActionItem;
