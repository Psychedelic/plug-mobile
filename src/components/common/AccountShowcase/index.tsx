import React from 'react';
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';

import { Text, Touchable, UserIcon } from '@/components/common';
import { FontStyles } from '@/constants/theme';

import styles from './styles';

interface Props {
  title?: string;
  subtitle?: string;
  icon?: string;
  selected: boolean;
  right: React.ReactNode;
  titleStyle?: StyleProp<TextStyle>;
  titleRight?: React.ReactNode;
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
  right,
  titleStyle,
  titleRight,
  onPress,
  onLongPress,
}: Props) {
  return (
    <View style={style}>
      <Touchable onPress={onPress} onLongPress={onLongPress}>
        <View style={[styles.root, selected && styles.selectedRoot]}>
          <UserIcon icon={icon} />
          <View style={styles.leftContainer}>
            <Text style={[FontStyles.Normal, titleStyle]}>
              {title}
              {titleRight}
            </Text>
            <Text style={FontStyles.NormalGray}>{subtitle}</Text>
          </View>
          <View style={styles.rightContainer}>{right}</View>
        </View>
      </Touchable>
    </View>
  );
}

export default AccountShowcase;
