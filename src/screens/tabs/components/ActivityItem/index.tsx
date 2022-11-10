import { t } from 'i18next';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { Text, Touchable } from '@/components/common';
import { VISIBLE_DECIMALS } from '@/constants/business';
import { FontStyles } from '@/constants/theme';
import UsdFormat from '@/formatters/UsdFormat';
import { Transaction } from '@/interfaces/redux';
import { formatDate } from '@/utils/dates';
import { formatToMaxDecimals } from '@/utils/number';
import shortAddress from '@/utils/shortAddress';

import ActivityIcon from '../ActivityIcon';
import { getCanisterName, getStatus, getSubtitle, getTitle } from '../utils';
import styles, { HEIGHT } from './styles';

export const ITEM_HEIGHT = HEIGHT;

interface Props extends Transaction {
  onPress?: (trx: Transaction) => void;
  style?: StyleProp<ViewStyle>;
  onlyDate?: boolean;
}

const ActivityItem = ({
  type,
  to,
  from,
  amount,
  value,
  status,
  date,
  symbol,
  logo,
  canisterId,
  details,
  style,
  canisterInfo,
  onPress,
  onlyDate,
}: Props) => {
  const isSonic = !!details?.sonicData;
  const isLiquidity = type.includes('Liquidity');

  return (
    <Touchable onPress={onPress} disabled={!onPress}>
      <View style={[styles.container, style]}>
        <ActivityIcon logo={logo} type={type} symbol={symbol} />
        <View style={styles.leftContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {getTitle(type, symbol)}
          </Text>
          <Text style={styles.text} numberOfLines={1}>
            {getStatus(status, styles)}
            {formatDate(date, 'MMM Do')}
            {!onlyDate && getSubtitle(type, to, from)}
          </Text>
        </View>
        <View style={styles.rightContainer}>
          {details?.tokenId && !isSonic ? (
            <>
              <Text numberOfLines={1} ellipsizeMode="tail" type="normal">
                {details?.tokenId?.length > 5
                  ? shortAddress(details?.tokenId)
                  : `#${details?.tokenId}`}
              </Text>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
                {getCanisterName(canisterInfo, canisterId)}
              </Text>
            </>
          ) : isLiquidity ? (
            <Text style={FontStyles.SmallGray}>{t('common.comingSoon')}</Text>
          ) : (
            <>
              {amount ? (
                <Text type="normal" numberOfLines={1}>{`${formatToMaxDecimals(
                  Number(amount),
                  VISIBLE_DECIMALS
                )} ${symbol}`}</Text>
              ) : null}
              {value ? (
                <UsdFormat
                  numberOfLines={1}
                  value={Number(value)}
                  style={FontStyles.SmallGray}
                />
              ) : null}
            </>
          )}
        </View>
      </View>
    </Touchable>
  );
};

export default ActivityItem;
