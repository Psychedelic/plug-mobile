import React from 'react';
import shortAddress from '../../../helpers/short-address';
import { ACTIVITY_TYPES, ACTIVITY_STATUS } from './constants';
import moment from 'moment';
import { Text } from 'react-native';

export const parseImageName = name => name.replace('.svg', '').toLowerCase();

export const getTitle = (type, symbol, swapData, plug) => {
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

export const getStatus = (status, styles) => {
  switch (status) {
    case ACTIVITY_STATUS.PENDING:
      return <Text style={styles.pending}>Pending</Text>;
    case ACTIVITY_STATUS.REVERTED:
      return <Text style={styles.failed}>Failed</Text>;
    default:
      return null;
  }
};

export const getDate = (status, date) =>
  status === ACTIVITY_STATUS.COMPLETED ? moment(date).format('MMM Do') : '';

export const getSubtitle = (type, to, from, t) =>
  ({
    [ACTIVITY_TYPES.SEND]: ` · To: ${shortAddress(to)}`,
    [ACTIVITY_TYPES.RECEIVE]: ` · From: ${shortAddress(from)}`,
    [ACTIVITY_TYPES.BURN]: ` · To: ${shortAddress(to)}`,
  }[type] || '');
