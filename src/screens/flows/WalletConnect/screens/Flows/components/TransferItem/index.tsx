import { t } from 'i18next';
import React from 'react';
import { Image, Text, View } from 'react-native';

import TokenFormat from '@/components/formatters/TokenFormat';
import UsdFormat from '@/components/formatters/UsdFormat';
import Icon from '@/components/icons';
import { FontStyles } from '@/constants/theme';
import { useToken } from '@/hooks/useToken';

import questionMark from '../../assets/questionMark.png';
import transferRequest from '../../assets/transferRequest.png';
import styles from './styles';

interface Props {
  canisterId: string;
  unknown?: boolean;
}

function TransferItem({ canisterId, unknown }: Props) {
  const { token, usdValue } = useToken(canisterId);

  const item = token && { icon: 'unknown', usdValue, ...token };

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
        {item && !unknown ? (
          <>
            <View style={styles.assetAmountContainer}>
              <Icon name={item.icon} style={styles.symbol} />
              <TokenFormat
                value={item.amount}
                token={item.symbol}
                style={FontStyles.Normal}
              />
            </View>
            <UsdFormat
              showSuffix
              value={item.usdValue}
              style={FontStyles.Subtitle3}
            />
          </>
        ) : (
          <View style={styles.unknownContainer}>
            <Image source={questionMark} style={styles.questionMark} />
            <Text style={FontStyles.Normal}>{t('walletConnect.unknown')}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

export default TransferItem;
