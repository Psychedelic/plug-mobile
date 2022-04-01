import { View, Text, Image } from 'react-native';
import moment from 'moment';
import React from 'react';

import TokenFormat from '../../../../components/number/TokenFormat';
import UsdFormat from '../../../../components/number/UsdFormat';
import { getStatus, getSubtitle, getTitle } from '../utils';
import shortAddress from '../../../../helpers/short-address';
import { FontStyles } from '../../../../constants/theme';
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
            <TokenFormat
              value={amount}
              token={symbol}
              style={FontStyles.Normal}
            />
            <UsdFormat value={Number(value)} style={FontStyles.SmallGray} />
          </>
        )}
      </View>
    </View>
  );
};

export default ActivityItem;
