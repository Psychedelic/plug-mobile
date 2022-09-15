import { Principal } from '@dfinity/principal';

import {
  ALPHANUM_REGEX,
  CANISTER_MAX_LENGTH,
  ICNS_REGEX,
} from '@/constants/addresses';

export const validateICNSName = (name: string) => ICNS_REGEX.test(name);

export const validatePrincipalId = (text: string) => {
  try {
    return text === Principal.fromText(text).toString();
  } catch (e) {
    return false;
  }
};

export const validateAccountId = (text: string) =>
  text.length === 64 && ALPHANUM_REGEX.test(text);

export const validateCanisterId = (text: string) => {
  try {
    return text.length <= CANISTER_MAX_LENGTH && validatePrincipalId(text);
  } catch (e) {
    return false;
  }
};
