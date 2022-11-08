import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Text from '@/components/common/Text';
import Icon from '@/components/icons';
import { VISIBLE_DECIMALS } from '@/constants/business';
import { FontStyles } from '@/constants/theme';
import UsdFormat from '@/formatters/UsdFormat';
import { formatDate } from '@/utils/dates';
import { formatToMaxDecimals } from '@/utils/number';
import shortAddress from '@/utils/shortAddress';

import ActivityIcon from '../ActivityIcon';
import { getCanisterName, getStatus, getSubtitle, getTitle } from '../utils';
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
  logo,
  canisterId,
  details,
  canisterInfo,
  icon,
}) => {
  const { t } = useTranslation();
  const isSonic = !!details?.sonicData;
  const isSwap = type === 'SWAP';
  const isLiquidity = type.includes('Liquidity');
  const tokenImage = image || logo;
  const TokenImageComponent = tokenImage ? (
    <ActivityIcon image={tokenImage} type={type} />
  ) : (
    <Icon name={`${symbol}`.toLowerCase()} />
  );

  // ojo que llega un icon.
  return (
    <View style={styles.container}>
      <TokenImageComponent />
      <View style={styles.leftContainer}>
        <Text numberOfLines={1} style={styles.title}>
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
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={FontStyles.Normal}>
              {details?.tokenId?.length > 5
                ? shortAddress(details?.tokenId)
                : `#${details?.tokenId}`}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={FontStyles.SmallGray}>
              {getCanisterName(canisterInfo, canisterId)}
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
