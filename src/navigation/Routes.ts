enum Routes {
  // Tabs Screens:
  NFTS = 'NFTs',
  TOKENS = 'Tokens',
  PROFILE = 'Profile',
  SWIPE_LAYOUT = 'SwipeLayout',
  // Auth Screens:
  LOGIN = 'Login',
  WELCOME = 'Welcome',
  CREATE_PASSWORD = 'CreatePassword',
  IMPORT_SEED_PHRASE = 'ImportSeedPhrase',
  BACKUP_SEED_PHRASE = 'BackupSeedPhrase',
  //Error Screens:
  CONNECTION_ERROR = 'ConnectionError',
  //Wallet Connect:
  WALLET_CONNECT_INITIAL_CONNECTION = 'WCInitialConnection',
  WALLET_CONNECT_FLOWS = 'WCFlows',
  WALLET_CONNECT_ERROR = 'WCError',
  //Settings:
  SETTINGS_STACK = 'SettingsStack',
  SETTINGS = 'Settings',
  CONTACTS = 'Contacts',
  APPROVED_CANISTERS = 'ApprovedCanisters',
  //Send:
  SEND_STACK = 'SendStack',
  SEND = 'Send',

  NFT_LIST = 'NFTList',
  NFT_DETAIL = 'NFTDetail',
}

export const NATIVE_ROUTES = Object.values(Routes);

export default Routes;
