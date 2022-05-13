import { t } from 'i18next';

import { ERROR_TYPES } from '@/constants/general';

export const getErrorStateData = type =>
  ({
    [ERROR_TYPES.FETCH_ERROR]: t(`errors.${ERROR_TYPES.FETCH_ERROR}`, {
      returnObjects: true,
    }),
    [ERROR_TYPES.CONNECTION_ERROR]: t(
      `errors.${ERROR_TYPES.CONNECTION_ERROR}`,
      {
        returnObjects: true,
      },
    ),
    [ERROR_TYPES.ERROR_BOUNDARY]: t(`errors.${ERROR_TYPES.ERROR_BOUNDARY}`, {
      returnObjects: true,
    }),
  }[type] || null);
