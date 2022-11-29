import { Principal } from '@dfinity/principal';

import {
  ACCOUNT_ID_LENGTH,
  ALPHANUM_REGEX,
  CANISTER_MAX_LENGTH,
  ICNS_REGEX,
} from '@/constants/addresses';
import { Wallet } from '@/interfaces/redux';

export const validateICNSName = (name: string) => ICNS_REGEX.test(name);

export const validatePrincipalId = (text: string) => {
  try {
    return text === Principal.fromText(text).toString();
  } catch (e) {
    return false;
  }
};

export const validateAccountId = (text: string) =>
  text.length === ACCOUNT_ID_LENGTH && ALPHANUM_REGEX.test(text);

export const validateCanisterId = (text: string) => {
  try {
    return text.length <= CANISTER_MAX_LENGTH && validatePrincipalId(text);
  } catch (e) {
    return false;
  }
};

export const isOwnAddress = (address: string, currentWallet: Wallet) =>
  validateICNSName(address)
    ? address === currentWallet.icnsData?.reverseResolvedName
    : address === currentWallet.principal ||
      address === currentWallet.accountId;
