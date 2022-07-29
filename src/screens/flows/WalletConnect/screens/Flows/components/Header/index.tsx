import { t } from 'i18next';
import React from 'react';
import { Image, Text, View } from 'react-native';

import { FontStyles } from '@/constants/theme';
import { FlowsRequest } from '@/interfaces/walletConnect';

import styles from './styles';

interface Props {
  request: FlowsRequest;
  isBatchTransactions: boolean;
}

function WCFlowHeader({ request, isBatchTransactions }: Props) {
  const dappImage = request?.args[0]?.icons[0];

  return (
    <>
      <View style={styles.backgroundLogo}>
        <Image source={{ uri: dappImage }} style={styles.logo} />
      </View>
      <Text style={[FontStyles.Title, styles.dappName]}>
        {request?.dappName}
      </Text>
      <Text style={[FontStyles.NormalGray, styles.subtitle]}>
        {isBatchTransactions
          ? t('walletConnect.actionsPermission')
          : t('walletConnect.cannisterPermission')}
      </Text>
    </>
  );
}

export default WCFlowHeader;
