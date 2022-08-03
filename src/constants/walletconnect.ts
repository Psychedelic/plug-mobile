export const PLUG_DESCRIPTION = {
  description: 'Plug IC Wallet ',
  icons: [], // We should add urls to icons
  name: 'Plug Wallet',
  url: 'https://plugwallet.ooo',
};

export const ERRORS = {
  NO_MSG_SIGN: { code: 400, message: 'No msg to sign on args' },
  NOT_APPROVED: { code: 401, message: 'Call request not approved' },
  NOT_METHOD: { code: 404, message: 'No method with this name' },
  CONNECTION_ERROR: {
    code: 401,
    message:
      'There was an error when this app/page tried to interact with your wallet in Plug. Please contact this project’s developers and share the error with them so they can fix it.',
  },
  CANISTER_ID_ERROR: {
    code: 400,
    message:
      'The transaction the app/page attempted failed because the destination Canister ID is invalid. Please contact this project’s developers so they can fix it.',
  },
  SERVER_ERROR: (message: string) => ({ code: 500, message }),
  AGENT_REJECTED: { code: 401, message: 'The agent creation was rejected.' },
  TRANSACTION_REJECTED: {
    code: 401,
    message: 'The transactions was rejected.',
  },
  BALANCE_ERROR: {
    code: 400,
    message:
      'The transaction that was just attempted failed because you don’t have enough funds. Review your balance before trying again, or contact the project’s developers.',
  },
  TOKEN_NOT_FOUND: {
    code: 404,
    message:
      'The token that was just attempted to transfer was not found. Please contact the project’s developers.',
  },
  CANISTER_NOT_WHITLESTED_ERROR: (canisterId: string) => ({
    code: 401,
    message: `This app tried to connect to a canister (${canisterId}) on your behalf without the proper permissions. Please contact this project’s developers and share the error with them so they can fix it.`,
  }),
  NOT_VALID_BATCH_TRANSACTION: {
    code: 401,
    message:
      'The transaction that was just attempted failed because it was not a valid batch transaction. Please contact the project’s developers.',
  },
  TIMEOUT: {
    code: 408,
    message:
      'The transaction that was just attempted failed because of timeout. Please contact the project’s developers.',
  },
  CLIENT_ERROR: (message: string) => ({ code: 400, message }),
};

export const BIOMETRICS_ANIMATION_DELAY = 569;
export const IS_TESTING = false;

export const CONNECTION_STATUS = {
  pending: 'pending',
  accepted: 'accepted',
  rejected: 'rejected',
  rejectedAgent: 'rejectedAgent',
  disconnected: 'disconnected',
  refused: 'refused',
};

export const TRANSFER_STATUS = {
  declined: 'declined',
  accepted: 'accepted',
};

export const SIGNING_METHODS = [
  'requestTransfer',
  'requestTransferToken',
  'requestBurnXTC',
  'batchTransaction',
  'requestCall',
  'verifyWhitelist',
];
