import { t } from 'i18next';
import React from 'react';

import Text from '@/components/common/Text';
import { ACTIVITY_STATUS } from '@/constants/business';
import { JELLY_CANISTER_ID } from '@/constants/canister';
import shortAddress from '@/utils/shortAddress';
import { capitalize } from '@/utils/strings.js';

export const parseImageName = name => name.replace('.png', '').toLowerCase();

export const getTitle = (type, symbol, swapData, plug) => {
  switch (type) {
    case 'SWAP':
      return swapData?.currency.name
        ? t('transactionTypes.swapFor', {
            from: symbol,
            to: swapData?.currency.name,
          })
        : t('transactionTypes.swap');
    case 'PLUG':
      return t('common.pluggedInto', { name: plug.name });
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

export const getSubtitle = (type, to, from) =>
  ({
    SEND: t('activity.subtitleTo', { value: shortAddress(to) }),
    BURN: t('activity.subtitleTo', { value: shortAddress(to) }),
    RECEIVE: t('activity.subtitleFrom', { value: shortAddress(from) }),
  }[type]);

export const getAddress = (type, to, from, canisterId) =>
  ({
    SEND: to,
    BURN: to,
    RECEIVE: from,
  }[type] ||
  canisterId ||
  '');

export const getCanisterName = (canisterInfo, canisterId) => {
  // TODO: change this when jelly supports multi-collections
  if (canisterId === JELLY_CANISTER_ID) {
    return 'Crowns';
  }
  return canisterInfo?.name || canisterId;
};
