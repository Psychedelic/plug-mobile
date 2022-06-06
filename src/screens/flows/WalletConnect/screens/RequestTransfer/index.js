import { useRoute } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { Container } from '@/layout';

import styles from '../../styles';
import WalletConnectLayaout from '..';

function RequestTransfer({ request, args, metadata }) {
  const { dappUrl, dappName } = request;
  const { to } = args;

  return (
    <>
      <Text style={styles.title}>{'REQUEST TRANSFER'}</Text>
      <Text style={styles.text}>{`DAP URL: ${dappUrl}`}</Text>
      <Text style={styles.text}>{`DAP NAME: ${dappName}`}</Text>
      <Text style={styles.text}>{`TO: ${to}`}</Text>
    </>
  );
}

export default RequestTransfer;
