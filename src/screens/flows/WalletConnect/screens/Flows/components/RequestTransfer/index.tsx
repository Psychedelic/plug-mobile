import { t } from 'i18next';
import React from 'react';
import { Image, Text, View } from 'react-native';

import { FontStyles } from '@/constants/theme';
import {
  WallectConnectFlowsData,
  WCFlowTypes,
} from '@/interfaces/walletConnect';

import ArrowDown from '../../assets/ArrowDown.png';
import styles from './styles';

interface Props extends WallectConnectFlowsData {
  type: WCFlowTypes;
}

// Matt - TODO: THIS IS A WIP SCREEN
function RequestTransfer({ request, args, type }: Props) {
  // const { dappUrl, dappName } = request;
  // console.log('args:', args);
  // console.log('type:', type);
  // const { to } = args;
  // Matt- TODO: hacer la funcion de abajo
  // const usdValue = getUsdValue(symbol, amount);

  return (
    <View style={styles.itemContainer}>
      <View style={styles.leftContainer}>
        <Image source={ArrowDown} style={styles.icon} />
        <View>
          <Text style={FontStyles.Normal}>
            {t('walletConnect.transaction')}
          </Text>
          <Text style={FontStyles.Subtitle3}>{t('walletConnect.request')}</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.assetAmountContainer}>
          <Image source={ArrowDown} style={styles.symbol} />
          <Text style={FontStyles.Normal}>1.10 WICP</Text>
        </View>
        <Text style={FontStyles.Subtitle3}>$12.11 USD</Text>
      </View>
    </View>
  );
}

export default RequestTransfer;
