export const ERROR_TYPES = {
  CONNECTION_ERROR: 'CONNECTION_ERROR',
  FETCH_ERROR: 'FETCH_ERROR',
  ERROR_BOUNDARY: 'ERROR_BOUNDARY',
};

export const getErrorStateData = type =>
  ({
    [ERROR_TYPES.FETCH_ERROR]: {
      emoji: '🤔',
      title: 'We had an issue',
      description:
        'We are unable to surface your account info due to an error.',
      buttonTitle: 'Refresh',
    },
    [ERROR_TYPES.CONNECTION_ERROR]: {
      emoji: '📡',
      title: 'Internet Connection Error',
      description:
        'We are unable to surface your account info due to an internet connection error.',
      buttonTitle: 'Retry Connection',
    },
    [ERROR_TYPES.ERROR_BOUNDARY]: {
      emoji: '😨',
      title: 'Oops, we had an issue!',
      description:
        'Close and reopen the app to try again. If the issue persists, contact our team on Discord.',
      buttonTitle: '  Join Discord',
      buttonImage: 'discord',
    },
  }[type] || null);
