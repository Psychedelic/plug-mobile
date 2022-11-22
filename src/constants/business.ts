/**
 * Decimals used to do truncate an amount in the app
 */
export const NUMBER_MAX_DECIMALS = 8;

/**
 * Decimals shown in the app by default
 */
export const VISIBLE_DECIMALS = 5;

export const ACTIVITY_TYPES = {
  SEND: 'SEND',
  RECEIVE: 'RECEIVE',
  SWAP: 'SWAP',
  PLUG: 'PLUG',
  BURN: 'BURN',
  MINT: 'MINT',
  TRANSFERFROM: 'TRANSFERFROM',
  DIRECT_BUY: 'DIRECTBUY',
  MAKE_LISTING: 'MAKELISTING',
  CANCEL_LISTING: 'CANCELLISTING',
  MAKE_OFFER: 'MAKEOFFER',
  ACCEPT_OFFER: 'ACCEPTOFFER',
  CANCEL_OFFER: 'CANCELOFFER',
  DENY_OFFER: 'DENYOFFER',
};

export const ACTIVITY_STATUS = {
  COMPLETED: 0,
  PENDING: 1,
  REVERTED: 2,
};

export const ACTIVITY_IMAGES = {
  RECEIVE: 'activityReceive',
  SEND: 'activitySend',
  BURN: 'burnActivity',
  MINT: 'mintActivity',
};
