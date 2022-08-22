import { t } from 'i18next';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { FontStyles } from '@/constants/theme';
import { FlowsRequest, WCFlowTypes } from '@/interfaces/walletConnect';

import UserShowcase from '../UserShowcase';
import styles from './styles';

interface Props {
  request: FlowsRequest;
  type: WCFlowTypes;
}

// Matt-TODO: This is a WIP SCREEN
function WCFlowDappInfo({ request, type }: Props) {
  const { currentWallet } = useSelector(state => state.keyring);
  // TODO: Show balance of selected asset at requestTransfer.
  // const { assets } = useSelector((state: State) => state.user);
  const dappImage = request?.args[0]?.icons[0];
  const isBatchTransactions = type === WCFlowTypes.batchTransactions;
  const isRequestTransfer = type === WCFlowTypes.transfer;

  return (
    <View
      style={{
        flexShrink: 1,
        width: '100%',
      }}>
      {isRequestTransfer && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomColor: '#ffffff16',
            borderBottomWidth: 1,
            paddingVertical: 24,
          }}>
          <View style={{ alignItems: 'flex-start' }}>
            <Text style={[FontStyles.NormalGray, styles.topTitle]}>Wallet</Text>
            <UserShowcase currentWallet={currentWallet} />
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={FontStyles.NormalGray}>Balance</Text>
            <Text style={FontStyles.Normal}>417.23 WICP</Text>
          </View>
        </View>
      )}
      <View style={{ flexGrow: 1, alignItems: 'center', paddingTop: 30 }}>
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
      </View>
    </View>
  );
}

export default WCFlowDappInfo;
