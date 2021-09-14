import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TokenIcon from './TokenIcon';
import { FontStyles } from '../constants/theme';

const TokenItem = ({ icon, name, amount, value, symbol }) => (
  <View style={styles.root}>
    <TokenIcon icon={icon} symbol={symbol} />
    <View style={styles.leftContainer}>
      <Text style={FontStyles.Normal}>{name}</Text>
      <Text style={FontStyles.NormalGray}>{amount}</Text>
    </View>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default TokenItem;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
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
