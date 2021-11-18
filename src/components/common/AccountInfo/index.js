import React from 'react';
import { FontStyles } from '../../../constants/theme';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import shortAddress from '../../../helpers/short-address';

const AccountInfo = () => {
  const { currentWallet } = useSelector(state => state.keyring);
  const { principal, name } = currentWallet || {};
  return (
    <View style={styles.container}>
      <Text style={FontStyles.Normal}>{name}</Text>
      <Text style={FontStyles.SmallGray}>{shortAddress(principal)}</Text>
    </View>
  );
};

export default AccountInfo;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
