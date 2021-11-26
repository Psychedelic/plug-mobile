import React from 'react';
import shortAddress from '../../../helpers/short-address';
import { ACTIVITY_TYPES, ACTIVITY_STATUS } from './constants';
import moment from 'moment';
import { Text } from 'react-native';

export const parseImageName = name => name.replace('.svg', '').toLowerCase();
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

export const getTitle = (type, symbol, swapData, plug, t) => {
  switch (type) {
    case 'SEND':
    case 'RECEIVE':
    case 'BURN':
      return `${capitalize(type?.toLowerCase())} ${symbol ?? ''}`;
    case 'SWAP':
      return `${t('activity.title.swap')} ${symbol} for ${
        swapData.currency.name
      }`;
    case 'PLUG':
      return `${t('activity.title.pluggedInto')} ${plug.name}`;
    default:
      return `Executed: ${capitalize(type?.toLowerCase())} ${symbol ?? ''}`;
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
