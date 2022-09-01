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
