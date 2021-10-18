import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontStyles } from '../../constants/theme';
import UsdFormat from '../number/UsdFormat';
import TokenFormat from '../number/TokenFormat';
import TokenIcon from './TokenIcon';

const TokenItem = ({ icon, name, amount, value, symbol, onPress, color, style, }) => (
  <View style={[styles.root, style]}>
    <TokenIcon icon={icon} symbol={symbol} color={color} />
    <View style={styles.leftContainer}>
      <Text style={FontStyles.Normal}>{name}</Text>
      <TokenFormat
        value={amount}
        token={symbol}
        style={FontStyles.NormalGray}
      />
    </View>
    <UsdFormat value={value * amount} style={styles.value} />
  </View>
)

export default TokenItem;

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
  value: {
    ...FontStyles.Normal,
    marginLeft: 'auto',
    alignSelf: 'flex-start',
  },
});
