import React from 'react';
import { Text, View } from 'react-native';

import {
  WallectConnectFlowsData,
  WCFlowTypes,
} from '@/interfaces/walletConnect';

// import styles from './styles';

interface Props extends WallectConnectFlowsData {
  type: WCFlowTypes;
}

// Matt-TODO:THIS IS A WIP SCREEN
function RequestTransfer({ request, args, type }: Props) {
  const { dappUrl, dappName } = request;
  console.log('args:', args);
  console.log('type:', type);
  // const { to } = args;

  return (
    <View style={{ flexGrow: 1 }}>
      <View style={{ flexDirection: 'row' }}>
        {/* <Image /> */}
        <View>
          <View>
            <Text>Transaction</Text>
            <Text>Request</Text>
          </View>
          <View>
            <View>
              {/* <Image /> */}
              <Text>1.10 WICP</Text>
            </View>
            <Text>$12.11 USD</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default RequestTransfer;
