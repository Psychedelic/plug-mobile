import { View, Text } from 'react-native';
import moment from 'moment';
import React from 'react';

import UsdFormat from '@components/number/UsdFormat';
import { formatToMaxDecimals } from '@utils/number';
import shortAddress from '@helpers/short-address';
import { FontStyles } from '@constants/theme';

import { getStatus, getSubtitle, getTitle } from '../utils';
import ActivityIcon from '../ActivityIcon';
import styles from './styles';

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
  return (
    <View style={styles.container}>
      <ActivityIcon image={plug?.image || image} type={type} />
      <View style={styles.leftContainer}>
        <Text style={FontStyles.Normal}>
          {getTitle(type, symbol, swapData, plug)}
        </Text>
        <Text style={FontStyles.SmallGray}>
          {getStatus(status, styles)}
          {moment(date).format('MMM Do')}
          {getSubtitle(type, to, from, canisterId)}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        {details?.tokenId ? (
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
        ) : (
          <>
            {amount && (
              <Text style={FontStyles.Normal}>{`${formatToMaxDecimals(
                Number(amount),
                8,
              )} ${symbol}`}</Text>
            )}
            <UsdFormat value={Number(value)} style={FontStyles.SmallGray} />
          </>
        )}
      </View>
    </View>
  );
};

export default ActivityItem;
