export const MIN_PASSWORD_LENGTH = 8;
export const COMMON_HITSLOP = {
  top: 10,
  left: 10,
  bottom: 10,
  right: 10,
};

export const isValidPassword = (password?: string) => {
  if (!password) {
    return false;
  }
  return password.trim() !== '' && password.length >= MIN_PASSWORD_LENGTH;
};

export enum ERROR_TYPES {
  CONNECTION_ERROR = 'CONNECTION_ERROR',
  FETCH_ERROR = 'FETCH_ERROR',
  ERROR_BOUNDARY = 'ERROR_BOUNDARY',
}
