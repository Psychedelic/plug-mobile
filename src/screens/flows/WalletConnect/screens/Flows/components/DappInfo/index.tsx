import { t } from 'i18next';
import React from 'react';
import { Image, Text, View } from 'react-native';

import { FontStyles } from '@/constants/theme';
import { FlowsRequest, WCFlowTypes } from '@/interfaces/walletConnect';

import styles from './styles';

interface Props {
  request: FlowsRequest;
  type: WCFlowTypes;
}

// Matt-TODO: This is a WIP SCREEN
function WCFlowDappInfo({ request, type }: Props) {
  // TODO: Show balance of selected asset at requestTransfer.
  // const { assets } = useSelector((state: State) => state.user);
  const dappImage = request?.args[0]?.icons[0];
  const isBatchTransactions = type === WCFlowTypes.batchTransactions;

  return (
    <View style={styles.container}>
      <View style={styles.backgroundLogo}>
        <Image source={{ uri: dappImage }} style={styles.logo} />
      </View>
      <Text style={[FontStyles.Title, styles.dappName]}>
        {request?.dappName}
      </Text>
      <Text style={[FontStyles.NormalGray, styles.subtitle]}>
        {isBatchTransactions // Add prurals for request transfer.
          ? t('walletConnect.actionsPermission')
          : t('walletConnect.cannisterPermission')}
      </Text>
    </View>
  );
}

export default WCFlowDappInfo;
