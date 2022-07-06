export const isValidPassword = password => password && password.length >= 12;

export const ERROR_TYPES = {
  CONNECTION_ERROR: 'CONNECTION_ERROR',
  FETCH_ERROR: 'FETCH_ERROR',
  ERROR_BOUNDARY: 'ERROR_BOUNDARY',
};
