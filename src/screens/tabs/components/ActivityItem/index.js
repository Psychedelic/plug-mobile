import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { VISIBLE_DECIMALS } from '@/constants/business';
import { FontStyles } from '@/constants/theme';
import UsdFormat from '@/formatters/UsdFormat';
import { formatDate } from '@/utils/dates';
import { formatToMaxDecimals } from '@/utils/number';
import shortAddress from '@/utils/shortAddress';

import ActivityIcon from '../ActivityIcon';
import { getStatus, getSubtitle, getTitle } from '../utils';
import styles, { HEIGHT } from './styles';

export const ITEM_HEIGHT = HEIGHT;

const ActivityItem = ({
  type,
  to,
  from,
  amount,
  value,
  status,
  date,
  plug,
  swapData,
  symbol,
  image,
  canisterId,
  details,
  canisterInfo,
}) => {
  const { t } = useTranslation();
  const isSonic = !!details?.sonicData;
  const isSwap = type === 'SWAP';
  const isLiquidity = type.includes('Liquidity');

  return (
    <View style={styles.container}>
      <ActivityIcon image={image} type={type} />
      <View style={styles.leftContainer}>
        <Text style={FontStyles.Normal}>
          {getTitle(type, symbol, swapData, plug)}
        </Text>
        <Text style={FontStyles.SmallGray}>
          {getStatus(status, styles)}
          {formatDate(date, 'MMM Do')}
          {getSubtitle(type, to, from, canisterId)}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        {details?.tokenId && !isSonic ? (
          <>
            <Text style={FontStyles.Normal}>
              {details?.tokenId?.length > 5
                ? shortAddress(details?.tokenId)
                : `#${details?.tokenId}`}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[FontStyles.SmallGray, styles.canisterName]}>
              {canisterInfo?.name || canisterId}
            </Text>
          </>
        ) : isSwap || isLiquidity ? (
          <Text style={FontStyles.SmallGray}>{t('common.comingSoon')}</Text>
        ) : (
          <>
            {amount ? (
              <Text style={FontStyles.Normal}>{`${formatToMaxDecimals(
                Number(amount),
                VISIBLE_DECIMALS
              )} ${symbol}`}</Text>
            ) : null}
            {value ? (
              <UsdFormat value={Number(value)} style={FontStyles.SmallGray} />
            ) : null}
          </>
        )}
      </View>
    </View>
  );
};

export default ActivityItem;
