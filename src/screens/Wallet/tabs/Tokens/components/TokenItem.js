import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { FontStyles } from '../../../../../constants/theme';
import UsdFormat from '../../../../../components/number/UsdFormat';
import TokenFormat from '../../../../../components/number/TokenFormat';

import TokenIcon from './TokenIcon';
<<<<<<< HEAD:src/screens/Wallet/tabs/Tokens/components/TokenItem.js
=======
import { FontStyles } from '../constants/theme';
import UsdFormat from '../components/number/UsdFormat';
import TokenFormat from './number/TokenFormat';
>>>>>>> 6adbe41a2b228d110e19763bdd58af03c897dd53:src/components/TokenItem.js

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
