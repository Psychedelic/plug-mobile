import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontStyles } from '../../constants/theme';
import UsdFormat from '../number/UsdFormat';
import TokenFormat from '../number/TokenFormat';
import TokenIcon from './TokenIcon';
import Icon from '../icons';
import Touchable from '../animations/Touchable';
import Row from '../layout/Row';

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

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  leftContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginLeft: 10,
  },
  icon: {
    marginLeft: 'auto',
    alignSelf: 'center',
  },
});
