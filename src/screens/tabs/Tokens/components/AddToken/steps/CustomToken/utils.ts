import { t } from 'i18next';

export type Errors =
  | 'INVALID_STANTARD'
  | 'INVALID_NFT'
  | 'INVALID_CANISTER_ID'
  | 'DEFAULT';

export interface Error {
  type: Errors;
  message: string;
  showMore: boolean;
}

export const getError = (error: string): Error => {
  if (error.includes('Call failed:')) {
    return {
      type: 'INVALID_STANTARD',
      message: t('addToken.invalidInterfaceTokenError'),
      showMore: true,
    };
  } else if (error.includes('The provided canister id is invalid')) {
    return {
      type: 'INVALID_CANISTER_ID',
      message: t('addToken.invalidCanisterTokenError'),
      showMore: true,
    };
  } else if (error.includes('InvalidToken')) {
    return {
      type: 'INVALID_NFT',
      message: t('addToken.nftTokenError'),
      showMore: true,
    };
  } else {
    return { type: 'DEFAULT', message: error, showMore: false };
  }
};
