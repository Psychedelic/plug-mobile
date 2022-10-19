import React from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';

import CircleCheckbox from '@/components/icons/svg/CircleCheckbox.svg';
import SelectedCircleCheckbox from '@/components/icons/svg/SelectedCircleCheckbox.svg';
import SelectedSquareCheckbox from '@/components/icons/svg/SelectedSquareCheckbox.svg';
import SquareCheckbox from '@/components/icons/svg/SquareCheckbox.svg';
import { COMMON_HITSLOP } from '@/constants/general';

import Text, { TextProps } from '../Text';
import styles from './styles';

interface Props {
  onPress?: () => void;
  selected: boolean;
  label?: string;
  circle?: boolean;
  testID?: string;
  labelProps?: TextProps;
  style?: StyleProp<ViewStyle>;
}

function CustomCheckbox({
  onPress,
  selected,
  label,
  testID,
  circle,
  labelProps,
  style,
}: Props) {
  const Checkbox = circle
    ? selected
      ? SelectedCircleCheckbox
      : CircleCheckbox
    : selected
    ? SelectedSquareCheckbox
    : SquareCheckbox;

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        testID={testID}
        onPress={onPress}
        hitSlop={COMMON_HITSLOP}>
        <Checkbox width={24} height={24} />
      </TouchableOpacity>
      {label && <Text {...labelProps}>{label}</Text>}
    </View>
  );
}

export default CustomCheckbox;
