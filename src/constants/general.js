export const isValidPassword = password => {
  if (!password) {
    return false;
  }
  return password.trim() !== '' && password.length >= 8;
};

export const ERROR_TYPES = {
  CONNECTION_ERROR: 'CONNECTION_ERROR',
  FETCH_ERROR: 'FETCH_ERROR',
  ERROR_BOUNDARY: 'ERROR_BOUNDARY',
};
