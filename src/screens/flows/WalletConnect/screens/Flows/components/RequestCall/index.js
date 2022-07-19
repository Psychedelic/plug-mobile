import React from 'react';
import { Text } from 'react-native';

import styles from '../../../InitialConnection/styles';

function RequestCall({ request, args, metadata }) {
  const { methodName } = args;
  const { dappUrl, dappName } = request;
  return (
    <>
      <Text style={styles.title}>{'REQUEST CALL'}</Text>
      <Text style={styles.text}>{`DAP URL: ${dappUrl}`}</Text>
      <Text style={styles.text}>{`DAP NAME: ${dappName}`}</Text>
      <Text style={styles.text}>{`METHOD: ${methodName}`}</Text>
    </>
  );
}

export default RequestCall;
