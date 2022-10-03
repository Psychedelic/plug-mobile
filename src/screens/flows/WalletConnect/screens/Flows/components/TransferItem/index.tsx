import { t } from 'i18next';
import React from 'react';
import { View } from 'react-native';

import { Image as FastImage } from '@/components/common';
import Text from '@/components/common/Text';
import TokenFormat from '@/components/formatters/TokenFormat';
import UsdFormat from '@/components/formatters/UsdFormat';
import Icon from '@/components/icons';
import QuestionMarkIcon from '@/components/icons/svg/QuestionMarkIcon.svg';
import TransferRequestIcon from '@/components/icons/svg/TransferRequestIcon.svg';
import { Colors, FontStyles } from '@/constants/theme';

import { TransferToken } from '../RequestCall';
import styles from './styles';

interface Props {
  unknown?: boolean;
  token: TransferToken;
}

function TransferItem({ unknown, token }: Props) {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.leftContainer}>
        <TransferRequestIcon fill={Colors.Black.Pure} style={styles.icon} />
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
              {token.imageUrl ? (
                <FastImage url={token.imageUrl} style={styles.logo} />
              ) : (
                <Icon name={token?.icon || 'unknown'} style={styles.symbol} />
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
            <QuestionMarkIcon
              fill={Colors.Black.Pure}
              style={styles.questionMark}
            />
            <Text style={FontStyles.Normal}>{t('walletConnect.unknown')}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

export default TransferItem;
