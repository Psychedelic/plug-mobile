import React, { useState } from 'react';
import { Text, View } from 'react-native';

import ImageDisplayer from '@/components/common/NftDisplayer/components/ImageDisplayer';
import CustomText from '@/components/common/Text';
import { FontStyles } from '@/constants/theme';
import useGetType from '@/hooks/useGetType';

import styles from './styles';

export interface Props {
  title: string;
  subtitle: string;
  iconUrl: string;
}

function ActionItem({ title, subtitle, iconUrl }: Props) {
  const [imageType, setImageType] = useState('');
  useGetType(iconUrl, setImageType);

  return (
    <View style={styles.itemDataContainer}>
      <View>
        <CustomText type="subtitle2" style={styles.title}>
          {title}
        </CustomText>
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
