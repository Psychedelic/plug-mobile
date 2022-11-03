import { t } from 'i18next';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import Touchable from '@/commonComponents/Touchable';
import Text from '@/components/common/Text';
import { FontStyles } from '@/constants/theme';
import TokenFormat from '@/formatters/TokenFormat';
import UsdFormat from '@/formatters/UsdFormat';
import Icon from '@/icons';
import { Asset } from '@/interfaces/redux';
import { Row } from '@/layout';
import TokenIcon from '@/tokens/TokenIcon';

import styles from './styles';

interface Props {
  token: Asset;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  availableAmount?: number;
  availableUsdAmount?: number;
  selectedInput: string;
  decimalScale?: number;
}

const TokenSelector = ({
  onPress,
  token,
  style,
  availableAmount,
  availableUsdAmount,
  selectedInput,
  decimalScale,
}: Props) => (
  <Touchable onPress={onPress}>
    <View style={[styles.root, style]}>
      <TokenIcon icon={token.icon} logo={token.logo} />
      <View style={styles.leftContainer}>
        <Text style={FontStyles.Normal}>{token.name}</Text>
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
              token={token.symbol}
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
