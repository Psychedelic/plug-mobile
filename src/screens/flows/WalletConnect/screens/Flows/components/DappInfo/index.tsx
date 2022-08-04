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

function WCFlowDappInfo({ request, type }: Props) {
  const dappImage = request?.args[0]?.icons[0];
  const showActionPermission =
    type === WCFlowTypes.transfer || type === WCFlowTypes.batchTransactions;

  return (
    <View style={styles.container}>
      <View style={styles.backgroundLogo}>
        <Image source={{ uri: dappImage }} style={styles.logo} />
      </View>
      <Text style={[FontStyles.Title, styles.dappName]}>
        {request?.dappName}
      </Text>
      <Text style={[FontStyles.NormalGray, styles.subtitle]}>
        {showActionPermission
          ? t(`walletConnect.actionsPermission.${type}`)
          : t('walletConnect.cannisterPermission')}
      </Text>
    </View>
  );
}

export default WCFlowDappInfo;
