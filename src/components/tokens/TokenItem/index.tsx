import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import Touchable from '@/commonComponents/Touchable';
import Text from '@/components/common/Text';
import { FontStyles } from '@/constants/theme';
import TokenFormat from '@/formatters/TokenFormat';
import UsdFormat from '@/formatters/UsdFormat';
import TokenIcon from '@/tokens/TokenIcon';
import animationScales from '@/utils/animationScales';

import styles from './styles';

interface Token {
  name?: string;
  amount?: number;
  value?: number;
  icon?: string;
  symbol?: string;
  logo?: string;
  thumbnail?: string;
}

interface Props {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  token: Token;
}

function TokenItem({ style, onPress, token }: Props) {
  const { amount, symbol, icon, logo, name, value, thumbnail } = token;
  return (
    <Touchable scale={animationScales.small} onPress={onPress}>
      <View style={[styles.root, style]}>
        <TokenIcon icon={icon} logo={thumbnail || logo} />
        <View style={styles.leftContainer}>
          {name ? <Text style={FontStyles.Normal}>{name}</Text> : null}
          {symbol ? (
            <TokenFormat
              value={amount}
              token={symbol}
              style={FontStyles.NormalGray}
            />
          ) : null}
        </View>
        <UsdFormat value={value} style={styles.value} />
      </View>
    </Touchable>
  );
}

export default TokenItem;
