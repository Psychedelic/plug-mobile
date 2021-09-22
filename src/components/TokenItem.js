import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TokenIcon from './TokenIcon';
import { FontStyles } from '../constants/theme';
import UsdFormat from '../helpers/UsdFormat';
import TokenFormat from '../helpers/TokenFormat';

const TokenItem = ({ icon, name, amount, value, symbol }) => (
  <View style={styles.root}>
    <TokenIcon icon={icon} symbol={symbol} />
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
);

export default TokenItem;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
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
