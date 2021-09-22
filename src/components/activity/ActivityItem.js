import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import moment from 'moment';
import { ACTIVITY_TYPES } from './constants';
import ActivityIcon from './ActivityIcon';
import { FontStyles } from '../../constants/theme';
import UsdFormat from '../../helpers/UsdFormat';
import TokenFormat from '../../helpers/TokenFormat';
import { getDate, getStatus, getSubtitle, getTitle } from './utils';

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

  return type === ACTIVITY_TYPES.PLUG
    ?
    (
      <View style={styles.container}>
        <Image style={styles.image} source={icon} />
        <View style={styles.leftContainer}>
          <Text style={styles.pluggedTitle}>{`Plugged into ${name}`}</Text>
          <Text>{moment(Date.parse(date)).format('MMM Do')}</Text>
        </View>
      </View>
    )
    :
    (
      <View style={styles.container}>
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
    )
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
