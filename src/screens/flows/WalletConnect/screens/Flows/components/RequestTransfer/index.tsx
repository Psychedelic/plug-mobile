import { t } from 'i18next';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import TokenFormat from '@/components/formatters/TokenFormat';
import UsdFormat from '@/components/formatters/UsdFormat';
import Icon from '@/components/icons';
import { getTokenPrices } from '@/constants/assets';
import { FontStyles } from '@/constants/theme';
import { State } from '@/interfaces/redux';
import { WallectConnectFlowsData, WCToken } from '@/interfaces/walletConnect';
import { getUsdAvailableAmount } from '@/screens/flows/Send/utils';

import transferRequest from '../../assets/transferRequest.png';
import styles from './styles';

interface Props extends WallectConnectFlowsData {
  token: WCToken;
}

// TODO: Matt: Do the unsafe layout
function RequestTransfer({ token }: Props) {
  const { icpPrice } = useSelector((state: State) => state.icp);
  const { amount, symbol, icon } = token;
  const tokenPrice = getTokenPrices(symbol, icpPrice);
  const usdValue = getUsdAvailableAmount(amount, tokenPrice);

  return (
    <View style={styles.itemContainer}>
      <View style={styles.leftContainer}>
        <Image source={transferRequest} style={styles.icon} />
        <View>
          <Text style={FontStyles.Normal}>
            {t('walletConnect.transaction')}
          </Text>
          <Text style={FontStyles.Subtitle3}>{t('walletConnect.request')}</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.assetAmountContainer}>
          <Icon name={icon} style={styles.symbol} />
          <TokenFormat
            value={amount}
            token={symbol}
            style={FontStyles.Normal}
          />
        </View>
        <UsdFormat showSuffix value={usdValue} style={FontStyles.Subtitle3} />
      </View>
    </View>
  );
}

export default RequestTransfer;
