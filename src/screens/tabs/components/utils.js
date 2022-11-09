import { t } from 'i18next';
import React from 'react';

import Text from '@/components/common/Text';
import { TOKENS } from '@/constants/assets';
import {
  ACTIVITY_IMAGES,
  ACTIVITY_STATUS,
  ACTIVITY_TYPES,
} from '@/constants/business';
import { JELLY_CANISTER_ID } from '@/constants/canister';
import { validateICNSName } from '@/utils/ids';
import shortAddress from '@/utils/shortAddress';
import { capitalize } from '@/utils/strings.js';

export const getNativeTokensLogo = symbol => {
  switch (symbol) {
    case TOKENS.ICP.symbol:
      return TOKENS.ICP.icon;
    case TOKENS.WICP.symbol:
      return TOKENS.WICP.icon;
    case TOKENS.XTC.symbol:
      return TOKENS.XTC.icon;
    default:
      return 'unknown';
  }
};

export const getTypeIcon = type => {
  switch (type) {
    case ACTIVITY_TYPES.RECEIVE:
      return ACTIVITY_IMAGES.RECEIVE;
    case ACTIVITY_TYPES.BURN:
      return ACTIVITY_IMAGES.BURN;
    case ACTIVITY_TYPES.SEND:
      return ACTIVITY_IMAGES.SEND;
    case ACTIVITY_TYPES.MINT:
      return ACTIVITY_IMAGES.MINT;
    default:
      return 'actionActivity';
  }
};

export const getTitle = (type, symbol) => {
  switch (type) {
    case 'DIRECTBUY':
      return t('transactionTypes.buyNTF');
    case 'MAKELISTING':
      return t('transactionTypes.listNFT');
    case 'CANCELLISTING':
      return t('transactionTypes.cancelListingNFT');
    case 'MAKEOFFER':
      return t('transactionTypes.makeOfferNFT');
    case 'ACCEPTOFFER':
      return t('transactionTypes.acceptOfferNFT');
    case 'CANCELOFFER':
      return t('transactionTypes.cancelOfferNFT');
    case 'DENYOFFER':
      return t('transactionTypes.denyOfferNFT');
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
      return (
        <Text style={styles.pending}>
          {t(`activity.${ACTIVITY_STATUS.PENDING}`)}
        </Text>
      );
    case ACTIVITY_STATUS.REVERTED:
      return (
        <Text style={styles.failed}>
          {t(`activity.${ACTIVITY_STATUS.REVERTED}`)}
        </Text>
      );
    default:
      return null;
  }
};

export const getSubtitle = (type, to, from) => {
  const toText = t('activity.subtitleTo', {
    value: validateICNSName(to) ? to : shortAddress(to),
  });
  const fromText = t('activity.subtitleFrom', {
    value: validateICNSName(from) ? from : shortAddress(from),
  });

  return {
    SEND: toText,
    BURN: toText,
    RECEIVE: fromText,
  }[type];
};

export const getCanisterName = (canisterInfo, canisterId) => {
  // TODO: change this when jelly supports multi-collections
  if (canisterId === JELLY_CANISTER_ID) {
    return 'Crowns';
  }
  return canisterInfo?.name || canisterId;
};
