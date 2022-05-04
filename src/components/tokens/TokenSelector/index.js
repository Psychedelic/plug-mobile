import React from 'react';
import { View, Text } from 'react-native';

import { Colors, FontStyles } from '@constants/theme';
import Touchable from '@commonComponents/Touchable';
import TokenFormat from '@formatters/TokenFormat';
import UsdFormat from '@formatters/UsdFormat';
import TokenIcon from '@tokens/TokenIcon';
import { Row } from '@layout';
import Icon from '@icons';

import styles from './styles';

const TokenSelector = ({
  icon,
  name,
  symbol,
  onPress,
  style,
  availableAmount,
  availableUsdAmount,
  selectedInput,
}) => (
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
            />
          ) : (
            <TokenFormat
              value={availableAmount}
              token={symbol}
              style={FontStyles.NormalGray}
            />
          )}

          <Text style={FontStyles.NormalGray}> available</Text>
        </Row>
      </View>
      <Icon name="swapArrows" style={styles.icon} />
    </View>
  </Touchable>
);

export default TokenSelector;
