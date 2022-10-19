import React, { useState } from 'react';
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';

import Touchable from '@/commonComponents/Touchable';
import UserIcon from '@/commonComponents/UserIcon';
import { FontStyles } from '@/constants/theme';
import useGetType from '@/hooks/useGetType';
import Icon from '@/icons';
import animationScales from '@/utils/animationScales';
import shortAddress from '@/utils/shortAddress';

import ImageDisplayer from '../NftDisplayer/components/ImageDisplayer';
import Text from '../Text';
import styles from './styles';

const longIdConfig = {
  leftSize: 10,
  rightSize: 5,
  separator: '...',
  replace: [],
};

interface Props {
  image?: string;
  imageUri?: string;
  name?: string;
  id?: string;
  subtitle?: string;
  longId?: boolean;
  icon?: string;
  right?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  nameStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  onLongPress?: () => void;
  onActionPress?: () => void;
  actionIconName?: string;
  showActions?: boolean;
  disabled?: boolean;
}

// TODO: Refactor this component, make it generic.
function CommonItem({
  image,
  imageUri,
  name,
  icon,
  id,
  right,
  style,
  longId,
  subtitle,
  nameStyle,
  onPress,
  onLongPress,
  onActionPress,
  actionIconName = 'threeDots',
  disabled,
  showActions = true,
}: Props) {
  const [imageType, setImageType] = useState('');
  useGetType(imageUri, setImageType);

  const formattedId = shortAddress(id, longId ? longIdConfig : undefined);

  return (
    <View style={style}>
      <Touchable
        scale={animationScales.small}
        onPress={onPress}
        onLongPress={onLongPress}
        disabled={disabled}>
        <View style={styles.root}>
          {imageUri ? (
            <ImageDisplayer
              url={imageUri}
              type={imageType}
              style={styles.image}
            />
          ) : image ? (
            <Icon name={image} />
          ) : (
            <UserIcon icon={icon} />
          )}
          <View style={styles.leftContainer}>
            <Text style={[FontStyles.Normal, nameStyle]}>
              {name || id}
              {right}
            </Text>
            <Text style={FontStyles.NormalGray}>{subtitle || formattedId}</Text>
          </View>
          {showActions && (
            <View style={styles.threeDots}>
              <Touchable
                onPress={onActionPress}
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
