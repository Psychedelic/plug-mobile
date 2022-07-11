import React from 'react';
import { Text } from 'react-native';

import styles from '../../styles';

function BatchTransactions({ request, args, metadata }) {
  const { methodName } = args;
  const { dappUrl, dappName } = request;

  return (
    <>
      <Text style={styles.title}>{'BATCH TRANSACTIONS'}</Text>
      <Text style={styles.text}>{`DAP URL: ${dappUrl}`}</Text>
      <Text style={styles.text}>{`DAP NAME: ${dappName}`}</Text>
      <Text style={styles.text}>{`METHOD: ${args.map(
        tx => tx.methodName
      )}`}</Text>
    </>
  );
}

export default BatchTransactions;
