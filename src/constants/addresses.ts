export const PRINCIPAL_REGEX = /(\w{5}-){10}\w{3}/;
export const ALPHANUM_AND_SPECIAL_CHARS_REGEX =
  /^[A-Za-z\d@_=$,.^&()_<>!%*#?&]+$/;
export const ALPHANUM_REGEX = /^[a-zA-Z0-9]+$/;
export const CANISTER_REGEX = /(\w{5}-){4}\w{3}/;
export const ICNS_REGEX = /^[a-zA-Z0-9-]{3,}\.icp$/;

export const CANISTER_MAX_LENGTH = 27;
export const ACCOUNT_ID_LENGTH = 64;
export const DEFAULT_FEE = 0.0001;
export const XTC_FEE = 0.002;

export const ADDRESS_TYPES = {
  PRINCIPAL: 'principal',
  ACCOUNT: 'accountId',
  CANISTER: 'canister',
};
