export const ACTIVITY_TYPES = {
  SEND: 0,
  RECEIVE: 1,
  SWAP: 2,
  PLUG: 3,
  BURN: 4,
  MINT: 5,
};

export const ACTIVITY_STATUS = {
  COMPLETED: 0,
  PENDING: 1,
  REVERTED: 2,
};

export const ACTIVITY_IMAGES = {
  [ACTIVITY_TYPES.RECEIVE]: 'activityReceive',
  [ACTIVITY_TYPES.SEND]: 'activitySend',
  [ACTIVITY_TYPES.BURN]: 'activityReceive',
};
