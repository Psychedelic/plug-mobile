import { t } from 'i18next';
import React from 'react';
import { View } from 'react-native';

import { Text } from '@/components/common';
import { VISIBLE_DECIMALS } from '@/constants/business';
import { FontStyles } from '@/constants/theme';
import UsdFormat from '@/formatters/UsdFormat';
import { Nullable } from '@/interfaces/general';
import { formatDate } from '@/utils/dates';
import { formatToMaxDecimals } from '@/utils/number';
import shortAddress from '@/utils/shortAddress';

import ActivityIcon from '../ActivityIcon';
import { getCanisterName, getStatus, getSubtitle, getTitle } from '../utils';
import styles, { HEIGHT } from './styles';

export const ITEM_HEIGHT = HEIGHT;

interface Props {
  type: string;
  to: string;
  from: string;
  amount: Nullable<number | typeof NaN>;
  value?: Nullable<number>;
  status?: number;
  date: bigint;
  swapData: any;
  symbol: string;
  logo: string;
  canisterId: string;
  details?: { [key: string]: any };
  canisterInfo?: Object;
}
const ActivityItem = ({
  type,
  to,
  from,
  amount,
  value,
  status,
  date,
  swapData,
  symbol,
  logo,
  canisterId,
  details,
  canisterInfo,
}: Props) => {
  const isSonic = !!details?.sonicData;
  const isSwap = type === 'SWAP';
  const isLiquidity = type.includes('Liquidity');

  return (
    <View style={styles.container}>
      <ActivityIcon logo={logo} type={type} symbol={symbol} />
      <View style={styles.leftContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {getTitle(type, symbol, swapData)}
        </Text>
        <Text style={[FontStyles.SmallGray, styles.text]} numberOfLines={1}>
          {getStatus(status, styles)}
          {formatDate(date, 'MMM Do')}
          {getSubtitle(type, to, from)}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        {details?.tokenId && !isSonic ? (
          <>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              type="normal"
              style={styles.text}>
              {details?.tokenId?.length > 5
                ? shortAddress(details?.tokenId)
                : `#${details?.tokenId}`}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[FontStyles.SmallGray, styles.text]}>
              {getCanisterName(canisterInfo, canisterId)}
            </Text>
          </>
        ) : isSwap || isLiquidity ? (
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
  );
};

export default ActivityItem;
