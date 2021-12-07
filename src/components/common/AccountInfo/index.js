import React from 'react';
import { FontStyles } from '../../../constants/theme';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import shortAddress from '../../../helpers/short-address';
import Clipboard from '@react-native-community/clipboard';
import Touchable from '../../animations/Touchable';

const AccountInfo = () => {
  const { currentWallet } = useSelector(state => state.keyring);
  const { principal, name } = currentWallet || {};

  const copyToClipboard = async () => {
    Clipboard.setString(principal);
  };

  return (
    <Touchable onPress={copyToClipboard}>
      <View style={styles.container}>
        <Text style={FontStyles.Normal}>{name}</Text>
        <Text style={FontStyles.SmallGray}>{shortAddress(principal)}</Text>
      </View>
    </Touchable>
  );
};

export default AccountInfo;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
