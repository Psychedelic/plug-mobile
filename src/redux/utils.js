import { Principal } from '@dfinity/principal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Flatted from 'flatted';
import { t } from 'i18next';

import { TOKEN_IMAGES, TOKENS } from '@/constants/assets';
import {
  KEYRING_KEYS_IN_STORAGE,
  KEYRING_STORAGE_KEY,
} from '@/constants/keyring';
import { validateAccountId, validatePrincipalId } from '@/utils/ids';

import { clear } from './slices/keyring';
import {
  getBalance,
  getContacts,
  getNFTs,
  getTransactions,
  setBalance,
  setCollections,
  setContacts,
  setTransactions,
} from './slices/user';

export const DEFAULT_ASSETS = [
  {
    symbol: 'ICP',
    name: 'ICP',
    amount: 0,
    value: 0,
    icon: TOKEN_IMAGES.ICP,
    decimals: TOKENS.ICP.decimals,
    canisterId: TOKENS.ICP.canisterId,
    fee: TOKENS.ICP.fee,
  },
  {
    symbol: 'XTC',
    name: 'Cycles',
    amount: 0,
    value: 0,
    icon: TOKEN_IMAGES.XTC,
    decimals: TOKENS.XTC.decimals,
    canisterId: TOKENS.XTC.canisterId,
    fee: TOKENS.XTC.fee,
  },
  {
    symbol: 'WICP',
    name: 'Wrapped ICP',
    amount: 0,
    value: 0,
    icon: TOKEN_IMAGES.WICP,
    decimals: TOKENS.WICP.decimals,
    canisterId: TOKENS.WICP.canisterId,
    fee: TOKENS.WICP.fee,
  },
];

export const DEFAULT_TRANSACTION = {
  status: null,
};

export const TRANSACTION_STATUS = {
  success: 'success',
  error: 'error',
};

export const resetStores = dispatch => {
  dispatch(clear());
  dispatch(setCollections([]));
  dispatch(setTransactions([]));
  dispatch(setBalance(DEFAULT_ASSETS));
};

export const getNewAccountData = async (dispatch, icpPrice) => {
  dispatch(setContacts([]));
  dispatch(getNFTs());
  dispatch(getBalance());
  dispatch(getTransactions({ icpPrice }));
  dispatch(getContacts());
};

export const formatContact = contact => {
  const [id] = Object.values(contact.value);

  return {
    image: contact.emoji[0],
    name: contact.name,
    id: contact.value?.PrincipalId?.toText() || `${id}`,
  };
};

export const formatContactForController = contact => ({
  description: [t('placeholders.contactDescription')],
  emoji: [contact.image],
  name: contact.name,
  value: contactCreateValueObj(contact.id),
});

export const contactCreateValueObj = currentId => {
  if (validatePrincipalId(currentId)) {
    return { PrincipalId: Principal.fromText(currentId) };
  }

  if (validateAccountId(currentId)) {
    return { AccountId: currentId };
  }

  return { Icns: currentId };
};

export const DEFAULT_WALLET_CONNECT_STATE = {
  pendingRedirect: {},
  pendingCallRequests: {},
  sessions: {},
  bridgeTimeouts: {},
};

export const migrateData = async () => {
  // remove unnecesary persisted data
  AsyncStorage.removeItem('persist:root');

  const oldState = {};
  await Promise.all(
    KEYRING_KEYS_IN_STORAGE.map(async k => {
      const flattedValue = await AsyncStorage.getItem(k);
      oldState[k] = flattedValue ? Flatted.parse(flattedValue) : undefined;
    })
  );
  await AsyncStorage.setItem(KEYRING_STORAGE_KEY, JSON.stringify(oldState));
  return oldState;
};

export const formatWallets = wallets =>
  Object.keys(wallets).map(key => wallets[key]);
