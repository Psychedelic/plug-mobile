import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import Touchable from '@/commonComponents/Touchable';
import Text from '@/components/common/Text';
import { FontStyles } from '@/constants/theme';
import TokenFormat from '@/formatters/TokenFormat';
import UsdFormat from '@/formatters/UsdFormat';
import { Asset } from '@/interfaces/redux';
import TokenIcon from '@/tokens/TokenIcon';
import animationScales from '@/utils/animationScales';

import styles from './styles';

interface Props {
  icon: string;
  name: string;
  amount: string | number;
  value: string | number;
  logo?: string;
  symbol: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  token: Asset;
}

function TokenItem({ color, style, onPress, token }: Props) {
  const { amount, symbol, icon, logo, name, value } = token;
  return (
    <Touchable scale={animationScales.small} onPress={() => onPress?.()}>
      <View style={[styles.root, style]}>
        <TokenIcon icon={icon} logo={logo} symbol={symbol} color={color} />
        <View style={styles.leftContainer}>
          <Text style={FontStyles.Normal}>{name}</Text>
          <TokenFormat
            value={amount}
            token={symbol}
            style={FontStyles.NormalGray}
          />
        </View>
        <UsdFormat value={value} style={styles.value} />
      </View>
    </Touchable>
  );
}

export default TokenItem;
