import React from 'react';
import { FontStyles } from '../../../constants/theme';
import { StyleSheet, View, Text } from 'react-native';

const AccountInfo = () => (
  <View style={styles.container}>
    <Text style={FontStyles.Normal}>lnth.icp</Text>
    <Text style={FontStyles.SmallGray}>jfodm...kfm</Text>
  </View>
);

export default AccountInfo;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
