import { t } from 'i18next';
import React from 'react';
import { Image, View } from 'react-native';

import { Image as FastImage } from '@/components/common';
import Text from '@/components/common/Text';
import TokenFormat from '@/components/formatters/TokenFormat';
import UsdFormat from '@/components/formatters/UsdFormat';
import Icon from '@/components/icons';
import { FontStyles } from '@/constants/theme';

// TODO: Pass .png to .svg after 0.2.0 merge
import questionMark from '../../assets/questionMark.png';
import transferRequest from '../../assets/transferRequest.png';
import { TransferToken } from '../RequestCall';
import styles from './styles';

interface Props {
  unknown?: boolean;
  token: TransferToken;
}

function TransferItem({ unknown, token }: Props) {
  console.log('TOKEN ICON', token.icon);

  return (
    <View style={styles.itemContainer}>
      <View style={styles.leftContainer}>
        <Image source={transferRequest} style={styles.icon} />
        <View>
          <Text style={FontStyles.Normal}>
            {t('walletConnect.transaction')}
          </Text>
          <Text type="subtitle3">{t('walletConnect.request')}</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        {token && !unknown ? (
          <>
            <View style={styles.assetAmountContainer}>
              {token.icon ? (
                <FastImage url={token.icon} style={styles.logo} />
              ) : (
                <Icon name="unknown" style={styles.symbol} />
              )}
              <TokenFormat
                decimalScale={4}
                value={token.amount}
                token={token.symbol}
                style={FontStyles.Normal}
              />
            </View>
            {token.usdValue ? (
              <UsdFormat
                suffix="USD"
                value={token.usdValue}
                style={FontStyles.Subtitle3}
              />
            ) : null}
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
