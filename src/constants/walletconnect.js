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
  SERVER_ERROR: message => ({ code: 500, message }),
  AGENT_REJECTED: { code: 401, message: 'The agent creation was rejected.' },
};

export const DEFAULT_STATE = {
  pendingRedirect: false,
  pendingSessionRequests: {},
  pendingCallRequests: {},
  walletConnectors: {},
  sessions: {},
};

export const BIOMETRICS_ANIMATION_DELAY = 569;
export const IS_TESTING = false;

export const SIGNING_METHODS = ['call_request'];

export const CONNECTION_STATUS = {
  pending: 'pending',
  accepted: 'accepted',
  rejected: 'rejected',
  rejectedAgent: 'rejectedAgent',
  disconnected: 'disconnected',
  refused: 'refused',
};
