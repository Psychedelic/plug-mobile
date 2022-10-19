import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { CustomCheckbox, Text, Touchable, UserIcon } from '@/components/common';
import { FontStyles } from '@/constants/theme';
import animationScales from '@/utils/animationScales';
import shortAddress from '@/utils/shortAddress';

import styles from './styles';

interface Props {
  title?: string;
  subtitle?: string;
  icon?: string;
  selected: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  onLongPress?: () => void;
}

function AccountShowcase({
  title,
  icon,
  subtitle,
  style,
  selected,
  onPress,
  onLongPress,
}: Props) {
  return (
    <View style={style}>
      <Touchable
        scale={animationScales.small}
        onPress={onPress}
        onLongPress={onLongPress}>
        <View style={[styles.root, selected && styles.selectedRoot]}>
          <UserIcon icon={icon} />
          <View style={styles.leftContainer}>
            <Text style={FontStyles.Normal}>{title}</Text>
            <Text style={FontStyles.NormalGray}>{shortAddress(subtitle)}</Text>
          </View>
          <View style={styles.rightContainer}>
            <CustomCheckbox circle selected={selected} onPress={onPress} />
          </View>
        </View>
      </Touchable>
    </View>
  );
}

export default AccountShowcase;
