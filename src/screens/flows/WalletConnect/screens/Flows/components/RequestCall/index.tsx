import React from 'react';
import { Text } from 'react-native';

import { WallectConnectFlowsData } from '@/interfaces/walletConnect';

import styles from '../../../InitialConnection/styles';

function RequestCall({ request, args }: WallectConnectFlowsData) {
  const { methodName } = args;
  const { dappUrl, dappName } = request;

  return (
    <>
      <Text style={styles.title}>{'REQUEST CALL'}</Text>
      <Text>{`DAP URL: ${dappUrl}`}</Text>
      <Text>{`DAP NAME: ${dappName}`}</Text>
      <Text>{`METHOD: ${methodName}`}</Text>
    </>
  );
}

export default RequestCall;
