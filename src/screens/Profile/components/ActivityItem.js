import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import moment from 'moment';

import { FontStyles } from '../../../constants/theme';
import UsdFormat from '../../../components/number/UsdFormat';
import TokenFormat from '../../../components/number/TokenFormat';

import ActivityIcon from './ActivityIcon';
import { getDate, getStatus, getSubtitle, getTitle } from './utils';
import { ACTIVITY_TYPES } from './constants';

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
  icon,
  symbol,
  hash,
  image,
  name,
  canisterId,
  details,
  canisterInfo,
}) => {

  //const isTransaction = ['SEND', 'RECEIVE'].includes(type) && symbol === 'ICP';

  return type === 'PLUG' ? (
    <View style={styles.container}>
      <Image style={styles.image} source={icon} />
      <View style={styles.leftContainer}>
        <Text style={styles.pluggedTitle}>{`Plugged into ${name}`}</Text>
        <Text>{moment(Date.parse(date)).format('MMM Do')}</Text>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <ActivityIcon image={plug?.image || image} type={type} />
      <View style={styles.leftContainer}>
        <Text style={FontStyles.Normal}>
          {getTitle(type, symbol, swapData, plug)}
        </Text>
        <Text style={FontStyles.SmallGray}>
          {getStatus(status, styles)}{moment(date).format('MMM Do')}
          {getSubtitle(type, to, from, canisterId)}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        {details?.tokenId ? (
          <>
            <Text style={FontStyles.Normal}>
              {details?.tokenId?.length > 5 ? shortAddress(details?.tokenId) : `#${details?.tokenId}`}
            </Text>
            <Text style={FontStyles.SmallGray}>
              {canisterInfo?.name || canisterId}
            </Text>
          </>
        ) : (
          <>
            <TokenFormat value={amount} token={symbol} style={FontStyles.Normal} />
            <UsdFormat value={Number(value)} style={FontStyles.SmallGray} />
          </>
        )}
      </View>
    </View>
  );
};

export default ActivityItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 20,
  },
  leftContainer: {
    justifyContent: 'space-evenly',
  },
  rightContainer: {
    marginLeft: 'auto',
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
  },
});
