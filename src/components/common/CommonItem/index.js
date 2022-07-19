import React from 'react';
import { Image, Text, View } from 'react-native';

import Touchable from '@/commonComponents/Touchable';
import UserIcon from '@/commonComponents/UserIcon';
import Icon from '@/components/icons';
import { FontStyles } from '@/constants/theme';
import animationScales from '@/utils/animationScales';
import shortAddress from '@/utils/shortAddress';

import styles from './styles';

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
}) {
  return (
    <View style={style}>
      <Touchable
        scale={animationScales.small}
        onPress={onPress}
        onLongPress={onLongPress}>
        <View style={styles.root}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <UserIcon icon={image} disabled />
          )}
          <View style={styles.leftContainer}>
            <Text style={FontStyles.Normal}>{name}</Text>
            <Text style={FontStyles.NormalGray}>{shortAddress(id)}</Text>
          </View>
          {showActions && (
            <View style={styles.threeDots}>
              <Touchable
                onPress={onLongPress}
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
