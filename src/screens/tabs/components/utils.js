import React from 'react';
import { Text } from 'react-native';

import shortAddress from '@/utils/shortAddress';

import { ACTIVITY_STATUS } from './constants';

export const parseImageName = name => name.replace('.png', '').toLowerCase();
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

export const getTitle = (type, symbol, swapData, plug) => {
  switch (type) {
    case 'SWAP':
      return swapData?.currency.name
        ? `Swap ${symbol} for ${swapData?.currency.name}`
        : 'Swap';
    case 'PLUG':
      return `Plugged into ${plug.name}`;
    default:
      if (type.includes('Liquidity')) {
        return type;
      } else {
        return `${capitalize(type?.toLowerCase())} ${symbol ?? ''}`;
      }
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