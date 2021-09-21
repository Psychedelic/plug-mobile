import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import moment from 'moment';
import { ACTIVITY_TYPES, ACTIVITY_STATUS } from '../constants/activity';
import ActivityIcon from './ActivityIcon';
import shortAddress from '../helpers/short-address';
import { FontStyles } from '../constants/theme';
import UsdFormat from '../helpers/UsdFormat';
import TokenFormat from '../helpers/TokenFormat';

const getTitle = (type, symbol, swapData, plug) => {
  switch (type) {
    case ACTIVITY_TYPES.SEND:
      return `Send ${symbol}`;
    case ACTIVITY_TYPES.RECEIVE:
      return `Receive ${symbol}`;
    case ACTIVITY_TYPES.SWAP:
      return `Swap ${symbol} for ${swapData.currency.name}`;
    case ACTIVITY_TYPES.PLUG:
      return `Plugged into ${plug.name}`;
    case ACTIVITY_TYPES.BURN:
      return `Burn ${symbol}`;
    case ACTIVITY_TYPES.MINT:
      return `Mint ${symbol}`;
    default:
      return '';
  }
};

const getStatus = status => {
  switch (status) {
    case ACTIVITY_STATUS.PENDING:
      return <Text style={styles.pending}>Pending</Text>;
    case ACTIVITY_STATUS.REVERTED:
      return <Text style={styles.failed}>Failed</Text>;
    default:
      return null;
  }
};

const getDate = (status, date) =>
  status === ACTIVITY_STATUS.COMPLETED ? moment(date).format('MMM Do') : '';

const getSubtitle = (type, to, from, t) =>
  ({
    [ACTIVITY_TYPES.SEND]: ` · To: ${shortAddress(to)}`,
    [ACTIVITY_TYPES.RECEIVE]: ` · From: ${shortAddress(from)}`,
    [ACTIVITY_TYPES.BURN]: ` · To: ${shortAddress(to)}`,
  }[type] || '');

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
}) => {
  if (type === ACTIVITY_TYPES.PLUG) {
    return (
      <View style={styles.root}>
        <Image style={styles.image} source={icon} />
        <View style={styles.leftContainer}>
          <Text style={styles.pluggedTitle}>{`Plugged into ${name}`}</Text>
          <Text>{moment(Date.parse(date)).format('MMM Do')}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <ActivityIcon image={plug?.image || image} type={type} />

      <View style={styles.leftContainer}>
        <Text style={FontStyles.Normal}>
          {getTitle(type, symbol, swapData, plug)}
        </Text>
        <Text style={FontStyles.SmallGray}>
          {getStatus(status)}
          {getDate(status, date)}
          {getSubtitle(type, to, from)}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <TokenFormat value={amount} token={symbol} style={FontStyles.Normal} />
        <UsdFormat value={value} style={FontStyles.SmallGray} />
      </View>
    </View>
  );
};

export default ActivityItem;

const styles = StyleSheet.create({
  root: {
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
