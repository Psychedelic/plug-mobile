import React, { useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import Touchable from '@/commonComponents/Touchable';
import UserIcon from '@/commonComponents/UserIcon';
import Icon from '@/components/icons';
import { FontStyles } from '@/constants/theme';
import useGetType from '@/hooks/useGetType';
import animationScales from '@/utils/animationScales';
import shortAddress from '@/utils/shortAddress';

import ImageDisplayer from '../NftDisplayer/components/ImageDisplayer';
import Text from '../Text';
import styles from './styles';

interface Props {
  image?: string;
  imageUri?: string;
  name?: string;
  id?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  onLongPress?: () => void;
  actionIconName?: string;
  showActions?: boolean;
}

function CommonItem({
  image,
  imageUri,
  name,
  id,
  style,
  onPress,
  onLongPress,
  actionIconName = 'threeDots',
  showActions = true,
}: Props) {
  const [imageType, setImageType] = useState('');
  useGetType(imageUri, setImageType);

  return (
    <View style={style}>
      <Touchable
        scale={animationScales.small}
        onPress={() => onPress?.()}
        onLongPress={onLongPress}>
        <View style={styles.root}>
          {imageUri ? (
            <ImageDisplayer
              url={imageUri}
              type={imageType}
              style={styles.image}
            />
          ) : (
            <UserIcon icon={image} />
          )}
          <View style={styles.leftContainer}>
            <Text style={FontStyles.Normal}>{name}</Text>
            <Text style={FontStyles.NormalGray}>{shortAddress(id)}</Text>
          </View>
          {showActions && (
            <View style={styles.threeDots}>
              <Touchable
                onPress={() => onLongPress?.()}
                scale={animationScales.large}
                hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}>
                <Icon name={actionIconName} />
              </Touchable>
            </View>
          )}
        </View>
      </Touchable>
    </View>
  );
}

export default CommonItem;
