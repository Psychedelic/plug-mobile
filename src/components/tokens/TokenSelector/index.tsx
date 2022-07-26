import { t } from 'i18next';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import Touchable from '@/commonComponents/Touchable';
import Text from '@/components/common/Text';
import { Colors, FontStyles } from '@/constants/theme';
import TokenFormat from '@/formatters/TokenFormat';
import UsdFormat from '@/formatters/UsdFormat';
import Icon from '@/icons';
import { Row } from '@/layout';
import TokenIcon from '@/tokens/TokenIcon';

import styles from './styles';

interface Props {
  icon?: string;
  name?: string;
  symbol: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  availableAmount: number;
  availableUsdAmount: number;
  selectedInput: string;
  decimalScale?: number;
}

const TokenSelector = ({
  icon,
  name,
  symbol,
  onPress,
  style,
  availableAmount,
  availableUsdAmount,
  selectedInput,
  decimalScale,
}: Props) => (
  <Touchable onPress={onPress}>
    <View style={[styles.root, style]}>
      <TokenIcon icon={icon} symbol={symbol} color={Colors.Gray.Tertiary} />
      <View style={styles.leftContainer}>
        <Text style={FontStyles.Normal}>{name}</Text>

        <Row>
          {selectedInput === 'USD' ? (
            <UsdFormat
              value={availableUsdAmount}
              style={FontStyles.NormalGray}
              decimalScale={decimalScale}
            />
          ) : (
            <TokenFormat
              value={availableAmount}
              token={symbol}
              style={FontStyles.NormalGray}
              decimalScale={decimalScale}
            />
          )}
          <Text style={styles.available}>{t('common.available')}</Text>
        </Row>
      </View>
      <Icon name="swapArrows" style={styles.icon} />
    </View>
  </Touchable>
);

export default TokenSelector;
