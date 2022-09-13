import React from 'react';
import { Image, StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

import Touchable from '@/commonComponents/Touchable';
import UserIcon from '@/commonComponents/UserIcon';
import Icon from '@/components/icons';
import { FontStyles } from '@/constants/theme';
import animationScales from '@/utils/animationScales';
import shortAddress from '@/utils/shortAddress';

import Text from '../Text';
import styles from './styles';

interface Props {
  image?: string;
  imageUri?: string;
  name?: string;
  id?: string;
  RightIcon?: React.FC<SvgProps>;
  rightIconProps?: SvgProps;
  style?: StyleProp<ViewStyle>;
  nameStyle?: StyleProp<TextStyle>;
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
  RightIcon,
  rightIconProps,
  style,
  nameStyle,
  onPress,
  onLongPress,
  actionIconName = 'threeDots',
  showActions = true,
}: Props) {
  return (
    <View style={style}>
      <Touchable
        scale={animationScales.small}
        onPress={() => onPress?.()}
        onLongPress={onLongPress}>
        <View style={styles.root}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <UserIcon icon={image} />
          )}
          <View style={styles.leftContainer}>
            <Text style={[FontStyles.Normal, nameStyle && nameStyle]}>
              {name}
              {RightIcon && <RightIcon {...rightIconProps} />}
            </Text>
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
