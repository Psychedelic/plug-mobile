export const MIN_PASSWORD_LENGTH = 8;

export const isValidPassword = password => {
  if (!password) {
    return false;
  }
  return password.trim() !== '' && password.length >= MIN_PASSWORD_LENGTH;
};

export const ERROR_TYPES = {
  CONNECTION_ERROR: 'CONNECTION_ERROR',
  FETCH_ERROR: 'FETCH_ERROR',
  ERROR_BOUNDARY: 'ERROR_BOUNDARY',
};

export const PLUG_PROXY_HOST = 'https://mainnet.plugwallet.ooo/';
export const IC_URL_HOST = 'https://ic0.app/';
// TODO: <ove this urls to URLS file after 0.2.0 merge
export const TRUST_AND_SECURITY_URL =
  'https://docs.plugwallet.ooo/resources/app-trust-and-security/';
