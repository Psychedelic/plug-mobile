import React from 'react';
import { Text } from 'react-native';

import styles from '../../../InitialConnection/styles';

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
