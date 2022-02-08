import { Text } from 'react-native';
import React from 'react';

import shortAddress from '../../../helpers/short-address';
import { ACTIVITY_STATUS } from './constants';

export const parseImageName = name => name.replace('.png', '').toLowerCase();
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

export const getTitle = (type, symbol, swapData, plug) => {
  switch (type) {
    case 'SWAP':
      return `Swap ${symbol} for ${swapData?.currency.name}`;
    case 'PLUG':
      return `Plugged into ${plug.name}`;
    default:
      return `${capitalize(type?.toLowerCase())} ${symbol ?? ''}`;
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

export const getSubtitle = (type, to, from) =>
  ({
    SEND: ` · To: ${shortAddress(to)}`,
    BURN: ` · To: ${shortAddress(to)}`,
    RECEIVE: ` · From: ${shortAddress(from)}`,
  }[type]);

export const getAddress = (type, to, from, canisterId) =>
  ({
    SEND: to,
    BURN: to,
    RECEIVE: from,
  }[type] ||
  canisterId ||
  '');
