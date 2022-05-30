import { View, Text } from 'react-native';
import React from 'react';

import Touchable from '@components/animations/Touchable';
import animationScales from '@utils/animationScales';
import UserIcon from '@commonComponents/UserIcon';
import shortAddress from '@helpers/shortAddress';
import { FontStyles } from '@constants/theme';
import Icon from '@components/icons';

import styles from './styles';

function CommonItem({ image, name, id, style, onPress, onLongPress }) {
  return (
    <View style={style}>
      <Touchable
        scale={animationScales.small}
        onPress={onPress}
        onLongPress={onLongPress}>
        <View style={styles.root}>
          <UserIcon icon={image} disabled />
          <View style={styles.leftContainer}>
            <Text style={FontStyles.Normal}>{name}</Text>
            <Text style={FontStyles.NormalGray}>{shortAddress(id)}</Text>
          </View>
          <View style={styles.threeDots}>
            <Touchable onPress={onLongPress} scale={animationScales.large}>
              <Icon name="threeDots" />
            </Touchable>
          </View>
        </View>
      </Touchable>
    </View>
  );
}

export default CommonItem;
