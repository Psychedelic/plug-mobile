import { useRoute } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { Container } from '@/layout';

import styles from '../../styles';
import WalletConnectLayaout from '..';

function RequestConnect({ request, args, metadata }) {
  const { dappUrl, dappName } = request;
  const { domainUrl, whitelist } = args;
  const { to } = args;

  return (
    <>
      <Text style={styles.title}>{'REQUEST CONNECT'}</Text>
      <Text style={styles.text}>{`DAP URL: ${dappUrl}`}</Text>
      <Text style={styles.text}>{`DAP NAME: ${dappName}`}</Text>
      <Text style={styles.text}>{`DOMAINURL: ${domainUrl}`}</Text>
      <Text style={styles.text}>{`WHITELIST: ${JSON.stringify(
        Object.keys(whitelist)
      )}`}</Text>
    </>
  );
}

export default RequestConnect;
