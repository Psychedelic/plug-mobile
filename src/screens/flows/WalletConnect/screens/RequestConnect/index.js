import React from 'react';
import { Text } from 'react-native';

import styles from '../../styles';

function RequestConnect({ request, args, metadata }) {
  const { dappUrl, dappName } = request;
  const { domainUrl, whitelist } = args;

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